import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import cron from 'node-cron';
import pdf from 'pdf-parse';

// Cargar variables de entorno desde el archivo .env en la raíz del proyecto
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: Faltan las variables VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en tu archivo .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// PDFs oficiales de práctica
const PDF_URLS = [
  { url: "http://icfes.acendra.com.co/wp-content/uploads/2024/12/02_PRACTICA_LECTURA.pdf", subject_id: 1 },
  { url: "http://icfes.acendra.com.co/wp-content/uploads/2024/12/04_PRACTICA_MATEMATICAS.pdf", subject_id: 2 },
  { url: "http://icfes.acendra.com.co/wp-content/uploads/2024/12/06_PRACTICA_SOCIALES.pdf", subject_id: 3 },
  { url: "http://icfes.acendra.com.co/wp-content/uploads/2024/12/08_PRACTICA_CIENCIAS.pdf", subject_id: 4 },
  { url: "http://icfes.acendra.com.co/wp-content/uploads/2024/12/10_PRACTICA_INGLES.pdf", subject_id: 5 }
];

const DOWNLOAD_DIR = path.resolve('./icfes_pdfs');

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR);
}

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    protocol.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Error descargando '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
};

// Función para extraer preguntas usando Expresiones Regulares
function extractQuestionsFromText(text, subject_id) {
  const questions = [];
  
  // Buscar bloques que parezcan preguntas. 
  // Patrón: Un número seguido de punto "1. ", texto, y luego las opciones A, B, C, D.
  // Esta es una heurística básica. Los PDFs del ICFES varían mucho.
  const questionBlocks = text.split(/\n(?=\d+\.)/g);

  for (let block of questionBlocks) {
    block = block.trim();
    if (!/^\d+\./.test(block)) continue; // Si no empieza con "1.", "2.", saltar

    // Intentar extraer las opciones
    const optionARegex = /\nA\./;
    const optionBRegex = /\nB\./;
    const optionCRegex = /\nC\./;
    const optionDRegex = /\nD\./;

    if (optionARegex.test(block) && optionBRegex.test(block) && optionCRegex.test(block) && optionDRegex.test(block)) {
      try {
        const questionText = block.substring(0, block.search(optionARegex)).replace(/^\d+\.\s*/, '').trim();
        const optA = block.substring(block.search(optionARegex) + 3, block.search(optionBRegex)).trim();
        const optB = block.substring(block.search(optionBRegex) + 3, block.search(optionCRegex)).trim();
        const optC = block.substring(block.search(optionCRegex) + 3, block.search(optionDRegex)).trim();
        
        // La opción D va desde la "D." hasta el final de ese bloque o hasta la tabla de respuestas (Clave)
        let endOfD = block.search(/\nClave|\nRespuesta|\n\d+\./i);
        if (endOfD === -1) endOfD = block.length;
        const optD = block.substring(block.search(optionDRegex) + 3, endOfD).trim();

        // Buscar si la respuesta correcta está mencionada explícitamente al final del bloque
        // Ejemplo: "Clave: B" o "Respuesta: B"
        const answerMatch = block.match(/\n(?:Clave|Respuesta|Correcta)[\s:]*([A-D])/i);
        
        let correctIndex = -1;
        if (answerMatch && answerMatch[1]) {
          const letter = answerMatch[1].toUpperCase();
          if (letter === 'A') correctIndex = 0;
          if (letter === 'B') correctIndex = 1;
          if (letter === 'C') correctIndex = 2;
          if (letter === 'D') correctIndex = 3;
        }

        // REGLA DEL USUARIO: Si no encuentra la correcta, no la subas.
        if (correctIndex !== -1 && questionText.length > 20) {
          questions.push({
            subject_id: subject_id,
            question_text: questionText,
            options: [optA, optB, optC, optD],
            correct_index: correctIndex,
            explanation: 'Pregunta extraída automáticamente del cuadernillo de práctica oficial del ICFES.',
            category: 'general',
            difficulty: 'medium',
            year: new Date().getFullYear()
          });
        }
      } catch (err) {
        // Ignorar bloques que no se pudieron parsear correctamente
      }
    }
  }

  return questions;
}

async function runScraper() {
  console.log("=========================================");
  console.log("🤖 INICIANDO ROBOT EXTRACTOR ICFES...");
  console.log("=========================================");

  let totalInserted = 0;

  for (let i = 0; i < PDF_URLS.length; i++) {
    const { url, subject_id } = PDF_URLS[i];
    const fileName = path.basename(url);
    const destPath = path.join(DOWNLOAD_DIR, fileName);

    console.log(`\n⬇️ Procesando: ${fileName}...`);
    try {
      if (!fs.existsSync(destPath)) {
        await downloadFile(url, destPath);
      }
      
      const dataBuffer = fs.readFileSync(destPath);
      const data = await pdf(dataBuffer);
      
      const extractedQuestions = extractQuestionsFromText(data.text, subject_id);
      console.log(`🔍 Se encontraron y estructuraron ${extractedQuestions.length} preguntas válidas (con respuesta correcta identificada).`);

      if (extractedQuestions.length > 0) {
        // Insertar en Supabase
        const { error } = await supabase
          .from('questions_bank')
          .upsert(extractedQuestions, { onConflict: 'question_text', ignoreDuplicates: true });

        if (error) {
          console.error(`❌ Error insertando preguntas en la base de datos:`, error.message);
        } else {
          console.log(`✅ ${extractedQuestions.length} preguntas insertadas en Supabase exitosamente.`);
          totalInserted += extractedQuestions.length;
        }
      }

    } catch (err) {
      console.error(`❌ Error en ${fileName}:`, err.message);
    }
  }

  console.log("\n=========================================");
  console.log(`🛑 ROBOT FINALIZADO. Total nuevas preguntas inyectadas hoy: ${totalInserted}`);
  console.log("=========================================");
}

// ==========================================
// PROGRAMADOR DE TAREAS (CRON JOB)
// ==========================================

// Para ejecutarlo manualmente AHORA MISMO (útil para pruebas):
const args = process.argv.slice(2);
if (args.includes('--run-now')) {
  runScraper();
} else {
  console.log("⏳ Robot iniciado en modo 'En Espera'.");
  console.log("📅 El robot está programado para correr automáticamente TODOS LOS DOMINGOS a la 01:00 AM.");
  console.log("💡 Tip: Si quieres forzar una extracción inmediata, ejecuta: node scripts/pdf_scraper.js --run-now");

  // Cron schedule: '0 1 * * 0' -> A la 1:00 AM todos los Domingos
  cron.schedule('0 1 * * 0', () => {
    console.log("⏰ Ejecución programada iniciada...");
    runScraper();
  });
}
