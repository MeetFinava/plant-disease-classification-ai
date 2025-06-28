import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      title: "🌱 Plant Disease Detection",
      subtitle: "AI-powered plant health analysis",
      selectPlant: "Select Your Plant",
      uploadImage: "Upload Plant Image",
      analyzeButton: "Analyze Disease",
      results: "Analysis Results",
      confidence: "Confidence",
      plant: "Plant",
      disease: "Disease",
      healthy: "Healthy",
      topPredictions: "Top Predictions",
      dragDrop: "Drag & drop an image here, or click to select",
      processing: "Analyzing image...",
      error: "Error occurred during analysis",
      contact: "Contact Us",
      about: "About",
      language: "Language",
      nav: {
        home: "Home",
        plantInfo: "Plant Info",
        contact: "Contact"
      }
    }
  },
  es: {
    translation: {
      title: "🌱 Detección de Enfermedades de Plantas",
      subtitle: "Análisis de salud vegetal con IA",
      selectPlant: "Selecciona Tu Planta",
      uploadImage: "Subir Imagen de Planta",
      analyzeButton: "Analizar Enfermedad",
      results: "Resultados del Análisis",
      confidence: "Confianza",
      plant: "Planta",
      disease: "Enfermedad",
      healthy: "Saludable",
      topPredictions: "Principales Predicciones",
      dragDrop: "Arrastra y suelta una imagen aquí, o haz clic para seleccionar",
      processing: "Analizando imagen...",
      error: "Error durante el análisis",
      contact: "Contáctanos",
      about: "Acerca de",
      language: "Idioma",
      nav: {
        home: "Inicio",
        plantInfo: "Info de Plantas",
        contact: "Contacto"
      }
    }
  },
  fr: {
    translation: {
      title: "🌱 Détection des Maladies des Plantes",
      subtitle: "Analyse de santé végétale par IA",
      selectPlant: "Sélectionnez Votre Plante",
      uploadImage: "Télécharger Image de Plante",
      analyzeButton: "Analyser la Maladie",
      results: "Résultats de l'Analyse",
      confidence: "Confiance",
      plant: "Plante",
      disease: "Maladie",
      healthy: "Sain",
      topPredictions: "Principales Prédictions",
      dragDrop: "Glissez-déposez une image ici, ou cliquez pour sélectionner",
      processing: "Analyse de l'image...",
      error: "Erreur lors de l'analyse",
      contact: "Nous Contacter",
      about: "À Propos",
      language: "Langue",
      nav: {
        home: "Accueil",
        plantInfo: "Info Plantes",
        contact: "Contact"
      }
    }
  },
  hi: {
    translation: {
      title: "🌱 पौधों की बीमारी की पहचान",
      subtitle: "AI द्वारा संचालित पौधों के स्वास्थ्य का विश्लेषण",
      selectPlant: "अपना पौधा चुनें",
      uploadImage: "पौधे की तस्वीर अपलोड करें",
      analyzeButton: "बीमारी का विश्लेषण करें",
      results: "विश्लेषण परिणाम",
      confidence: "विश्वास",
      plant: "पौधा",
      disease: "बीमारी",
      healthy: "स्वस्थ",
      topPredictions: "शीर्ष भविष्यवाणियां",
      dragDrop: "यहाँ एक तस्वीर खींचें और छोड़ें, या चुनने के लिए क्लिक करें",
      processing: "तस्वीर का विश्लेषण हो रहा है...",
      error: "विश्लेषण के दौरान त्रुटि हुई",
      contact: "हमसे संपर्क करें",
      about: "हमारे बारे में",
      language: "भाषा",
      nav: {
        home: "होम",
        plantInfo: "पौधे की जानकारी",
        contact: "संपर्क"
      },
      plantInfo: {
        title: "पौधे की जानकारी",
        subtitle: "सामान्य पौधों की बीमारियों और उनके प्रबंधन के बारे में जानें",
        selectPlant: "एक पौधा चुनें",
        diseases: "सामान्य बीमारियां",
        symptoms: "लक्षण",
        prevention: "रोकथाम",
        treatment: "उपचार",
        severity: "गंभीरता"
      },
      contactPage: {
        title: "हमसे संपर्क करें",
        subtitle: "पौधों की बीमारियों या तकनीकी सहायता के बारे में प्रश्न हैं? हम यहाँ मदद के लिए हैं!",
        sendMessage: "हमें संदेश भेजें",
        formDescription: "नीचे दिया गया फॉर्म भरें और हम जल्द से जल्द आपसे संपर्क करेंगे।",
        fullName: "पूरा नाम",
        emailAddress: "ईमेल पता",
        phoneNumber: "फोन नंबर",
        message: "संदेश",
        messagePlaceholder: "हमें अपने पौधों की बीमारी के प्रश्न या तकनीकी समस्याओं के बारे में बताएं...",
        sendButton: "संदेश भेजें",
        getInTouch: "संपर्क में रहें",
        contactDescription: "हम हमेशा आपके पौधों की देखभाल के प्रश्नों में मदद करने के लिए खुश हैं।",
        email: "ईमेल",
        phone: "फोन",
        address: "पता",
        businessHours: "व्यावसायिक घंटे",
        emailDescription: "हमें कभी भी ईमेल भेजें",
        phoneDescription: "व्यावसायिक घंटों के दौरान हमें कॉल करें",
        addressDescription: "हमारे कार्यालय में आएं",
        hoursDescription: "हम आपकी मदद के लिए यहाँ हैं",
        successMessage: "धन्यवाद! हम जल्द ही संपर्क करेंगे। आपका संदेश सफलतापूर्वक भेजा गया है।"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
