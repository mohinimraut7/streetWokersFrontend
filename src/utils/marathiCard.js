/**
 * src/utils/marathiCard.js  (NEW file)
 *
 * ID card var values Marathi madhe dakhavnyasathi — DB la AJIBAT haat lavat nahi.
 * Sagla rupantar browser madhech hota, fakta display sathi.
 *
 * - नाव / पत्ता / व्यवसाय: useMarathiVendor(vendor) hook
 *     • business type & patte: tumchya data varun banvleli dictionary (arthapramane Marathi)
 *     • naave & baki shabd: Google transliteration (browser madhun), cache sah
 *     • convert hot nasel (internet / error) tar English tasach disel → card kadhi tutnar nahi
 * - मोबाईल, दिनांक, वय, वेळ, प्रभाग: sync helpers (mrDigits, dateMr, timingMr, wardMr)
 * - ओळखपत्र क्रमांक: jasa aahe tasach (ithe convert hot nahi)
 */
import { useEffect, useState } from "react";

/* =====================================================================
   DICTIONARIES — tumchya data (13,469 records) varun banvlele.
   ===================================================================== */

/* ── Business type: aadhi poore phrases (spelling vegle asle tari) ── */
const BUSINESS_PHRASES = [
  [/\b(VADA|WADA)\s*(PAV|PAO)\b|\bVADAPAV\b/g, "वडापाव"],
  [/\bPAV\s*BHAJI\b/g, "पावभाजी"],
  [/\bPANI\s*PURI\b|\bPANIPURI\b|\bPANI\s*POORI\b/g, "पाणीपुरी"],
  [/\bBHEL\s*PURI\b|\bBHELPURI\b/g, "भेळपुरी"],
  [/\bICE\s*CREAM\b|\bICECREAM\b/g, "आईस्क्रीम"],
  [/\b(HAR|HAAR)\s*(PHOOL|FOOL|FUL)\b|\bHARPHOOL\b/g, "हार-फुले"],
  [/\b(PAN|PAAN)\s*(PATTI|PATI)\b|\bPA+NPATTI\b/g, "पान पट्टी"],
  [/\bEGG\s*(PAV|PAO)\b/g, "अंडा पाव"],
  [/\bFAST\s*FOOD\b/g, "फास्ट फूड"],
  [/\bDRY\s*FRUITS?\b/g, "सुका मेवा"],
  [/\bGUNNA\s*JUICE\b|\bGANNA\s*JUICE\b/g, "उसाचा रस"],
  [/\bSUGAR\s*CANE\b/g, "ऊस"],
  [/\bKHARI\s*BISCUIT\b/g, "खारी बिस्किट"],
  [/\bCHINESE\s*BHEL\b/g, "चायनीज भेळ"],
  [/\bNEWS\s*PAPER\b/g, "वर्तमानपत्र"],
  [/\bMOBILE\s*COVER\b/g, "मोबाईल कव्हर"],
  [/\bCHAPPAL\s*REPAIR(ING)?\b/g, "चप्पल दुरुस्ती"],
  [/\bGENERAL\s*STORES?\b/g, "जनरल स्टोअर"],
  [/\bPOOJA\s*SAMAGRI\b/g, "पूजा साहित्य"],
];

const BUSINESS_WORDS = {
  STALL: "स्टॉल", SATLL: "स्टॉल", STOLL: "स्टॉल", SHOP: "दुकान", STORE: "स्टोअर", STORES: "स्टोअर",
  WALA: "वाला", VALA: "वाला", SELLER: "विक्रेता", SELLEL: "विक्रेता", SALE: "विक्री", CENTER: "सेंटर", CORNER: "कॉर्नर",
  FISH: "मासे", FISHWALA: "मासेवाला", FISHERS: "मासेविक्रेते", FISHAR: "मासेविक्रेते", MACHHI: "मच्छी", MACCHI: "मच्छी", MIECHI: "मच्छी",
  SABJI: "भाजी", SABJIWALA: "भाजीवाला", SABHJIWALA: "भाजीवाला", BHAJI: "भाजी", BHAJIWALA: "भाजीवाला",
  VEGETABLE: "भाजीपाला", VEGETABLES: "भाजीपाला", VEGITABLE: "भाजीपाला", VEGETABAL: "भाजीपाला", VEGETAALE: "भाजीपाला", VEG: "भाजीपाला",
  FRUIT: "फळे", FRUITS: "फळे", FRUITE: "फळे", FROOT: "फळे", FRUTI: "फळे", FRUITWALA: "फळवाला",
  BANANA: "केळी", ORANGE: "संत्री", COCONUT: "नारळ", COCOUNT: "नारळ", NARIYAL: "नारळ", NARAYAL: "नारळ",
  ONION: "कांदा", ONIAN: "कांदा", KANDA: "कांदा", POTATO: "बटाटा", BATATA: "बटाटा",
  TOMATO: "टोमॅटो", TOMETO: "टोमॅटो", TOMATTO: "टोमॅटो", TOMATOWALA: "टोमॅटोवाला",
  GARLIC: "लसूण", LASOON: "लसूण", LASUN: "लसूण", LASOONWALA: "लसूणवाला",
  LEMON: "लिंबू", NIMBU: "लिंबू", LIMBU: "लिंबू", MIRCHI: "मिरची", MIRCH: "मिरची", HARA: "हिरवी",
  CLOTH: "कपडे", CLOTHS: "कपडे", CLOTHES: "कपडे", KAPADA: "कपडे", KAPDA: "कपडे", CLOTHWALA: "कपडेवाला",
  GARMENT: "कपडे", READYMADE: "रेडिमेड", REDIMET: "रेडिमेड", SAREE: "साडी", SAREEWALA: "साडीवाला", LADIES: "महिला",
  CHADDARWALA: "चादरवाला", RUMAL: "रुमाल",
  FLOWER: "फुले", FLOWERS: "फुले", FLOWAR: "फुले", PHOOL: "फुले", FOOL: "फुले", FOOLWALA: "फुलवाला", MALA: "माळा", HAAR: "हार", HAR: "हार",
  MASALA: "मसाला", JUICE: "ज्यूस", JUSH: "ज्यूस", SHARBAT: "सरबत", SARBAT: "सरबत", SARWAT: "सरबत", SHARBATWALA: "सरबतवाला",
  TEA: "चहा", CHAI: "चहा", MILK: "दूध", WATER: "पाणी", SODA: "सोडा", LASSI: "लस्सी", LASSIWALA: "लस्सीवाला", NIRA: "नीरा", NIRAWALA: "नीरावाला",
  CHINESE: "चायनीज", CHINES: "चायनीज", MANCHURIAN: "मंचुरियन", BHEL: "भेळ", BHELWALA: "भेळवाला",
  EGG: "अंडी", CHICKEN: "चिकन", CHIKEN: "चिकन", CHICKENWALA: "चिकनवाला", BHURJI: "भुर्जी",
  IDLI: "इडली", DOSA: "डोसा", DHOSA: "डोसा", SAMOSA: "समोसा", SANDWICH: "सँडविच", SANDVIJWALA: "सँडविचवाला",
  DABELI: "दाबेली", DABELIWALA: "दाबेलीवाला", JALEBI: "जिलेबी", JALEBIWALA: "जिलेबीवाला", FARSAN: "फरसाण", FARSANWALA: "फरसाणवाला",
  NASTA: "नाश्ता", SNACKS: "नाश्ता", FOOD: "खाद्यपदार्थ", FRY: "फ्राय", MISAL: "मिसळ", PAPAD: "पापड", AACHAR: "लोणचे", PICKLE: "लोणचे",
  CHANA: "चणे", MOONGFALI: "शेंगदाणे", CORN: "मका", POPCORN: "पॉपकॉर्न", GOLA: "बर्फाचा गोळा", BARAF: "बर्फ", FALUDA: "फालुदा", BISCUIT: "बिस्किट",
  PULSE: "कडधान्य", PULSES: "कडधान्य", KADDHANYA: "कडधान्य", KARDHAN: "कडधान्य", DAL: "डाळ", BOR: "बोरे", SEASONAL: "हंगामी", SEASON: "हंगामी",
  CUTLARY: "कटलरी", CUTLERY: "कटलरी", CUTLARI: "कटलरी", KATLARI: "कटलरी", KATLAHRI: "कटलरी", KATLERI: "कटलरी", CATELLERY: "कटलरी", CATTELARY: "कटलरी",
  IMITATION: "इमिटेशन", EMITATION: "इमिटेशन", JWELLERY: "दागिने", COSMETIC: "सौंदर्यप्रसाधने", COSMATIC: "सौंदर्यप्रसाधने", CHUDI: "बांगड्या",
  CHAPPAL: "चप्पल", SHOES: "बूट", SHOOES: "बूट", MOCHI: "मोची", MOOCHI: "मोची", REPAIRING: "दुरुस्ती", REPAIR: "दुरुस्ती",
  TAILOR: "शिंपी", DARJI: "शिंपी", SALOON: "सलून", ELECTRICIAN: "इलेक्ट्रिशियन", ELECTRONICS: "इलेक्ट्रॉनिक्स",
  PLASTIC: "प्लास्टिक", BARTAN: "भांडी", STEEL: "स्टील", STOVE: "स्टोव्ह", BAG: "बॅग", PURSE: "पर्स", BELT: "पट्टा", BELTWALA: "पट्टेवाला",
  WATCH: "घड्याळ", LOCK: "कुलूप", KEY: "चावी", CHABBIWALA: "चावीवाला", CHABIWALA: "चावीवाला",
  KHILONA: "खेळणी", KHILONAWALA: "खेळणीवाला", BOOK: "पुस्तके", PAPER: "पेपर", PAPERWALA: "पेपरवाला", NEWS: "बातम्या",
  MOBILE: "मोबाईल", COVER: "कव्हर", RECHARGE: "रिचार्ज", AGARBATTI: "अगरबत्ती", POOJA: "पूजा", SAMAGRI: "साहित्य",
  GENERAL: "जनरल", ITEM: "वस्तू", MATERIAL: "साहित्य", SAMAN: "सामान", BHANGAR: "भंगार", BHANDAR: "भांडार",
  HATHGADI: "हातगाडी", TABLE: "टेबल", TOKARI: "टोपली", MIX: "मिश्र", AND: "व", ETC: "इत्यादी",
};

/* ── Address: short forms + VVCMC bhagatli thikane (nemke Marathi spelling) ── */
const ADDRESS_WORDS = {
  NO: "नं.", R: "रूम", ROOM: "रूम", RM: "रूम", FLAT: "फ्लॅट", SHOP: "दुकान", GALA: "गाळा",
  RD: "रोड", ROAD: "रोड", MARG: "मार्ग", GULLY: "गल्ली", GALLI: "गल्ली", LANE: "लेन",
  APT: "अपार्टमेंट", APPT: "अपार्टमेंट", APARTMENT: "अपार्टमेंट", BLDG: "बिल्डिंग", BUILDING: "बिल्डिंग",
  SOC: "सोसायटी", SOCIETY: "सोसायटी", HSG: "हौसिंग", HOUSING: "हौसिंग", CO: "को", OP: "ऑप",
  CHAWL: "चाळ", NAGAR: "नगर", NGR: "नगर", PADA: "पाडा", NAKA: "नाका", PHATA: "फाटा", GAON: "गाव", TALAO: "तलाव",
  MANDIR: "मंदिर", NIWAS: "निवास", SADAN: "सदन", COLONY: "कॉलनी", PARK: "पार्क", HOTEL: "हॉटेल",
  MARKET: "मार्केट", MKT: "मार्केट", STATION: "स्टेशन", STN: "स्टेशन", SCHOOL: "शाळा", BANK: "बँक", POLICE: "पोलीस",
  HOSPITAL: "हॉस्पिटल", CHURCH: "चर्च", MASJID: "मशीद", KILLA: "किल्ला", KOLIWADA: "कोळीवाडा",
  MAHANAGARPALIKA: "महानगरपालिका", ESTATE: "इस्टेट", COMPLEX: "कॉम्प्लेक्स", TOWER: "टॉवर",
  E: "(पू)", EAST: "(पू)", W: "(प)", WEST: "(प)",
  VASAI: "वसई", BASSEIN: "वसई", VIRAR: "विरार", NALLASOPARA: "नालासोपारा", NALASOPARA: "नालासोपारा", NSP: "नालासोपारा",
  NAIGAON: "नायगाव", THANE: "ठाणे", PALGHAR: "पालघर", MOREGAON: "मोरेगाव", SATIVALI: "सातिवली",
  PAPDI: "पापडी", PAPDY: "पापडी", PAPADI: "पापडी", ACHOLE: "आचोळे", KARGIL: "कारगिल", VALIV: "वालीव", MANVEL: "मानवेल",
  TULINJ: "तुळींज", AGASHI: "आगाशी", AAGASHI: "आगाशी", AMBADI: "आंबाडी", ARNALA: "अर्नाळा", JIVDANI: "जीवदानी",
  PACHUBANDAR: "पाचूबंदर", CHANDANSAR: "चंदनसार", PHOOLPADA: "फुलपाडा", DHANIV: "धानिव", TUNGAR: "तुंगार", MANDAVI: "मांडवी",
};

/* ── Nave: tumchya data madhli sarvat jast yenari ~400 naave, nemkya Marathi spelling sah.
      (Google ne chukicha lihila tari hi yaadi aadhi vaprli jate) ── */
const NAME_WORDS = {
  GUPTA: "गुप्ता", YADAV: "यादव", KUMAR: "कुमार", PATIL: "पाटील", RAMESH: "रमेश", SINGH: "सिंग", SURESH: "सुरेश",
  SHAIKH: "शेख", SANJAY: "संजय", RAJBHAR: "राजभर", SANTOSH: "संतोष", ASHOK: "अशोक", VIJAY: "विजय", RAJESH: "राजेश",
  PRAKASH: "प्रकाश", PRASAD: "प्रसाद", TIWARI: "तिवारी", PRAJAPATI: "प्रजापती", RAM: "राम", MEHER: "मेहेर", KHAN: "खान",
  RAMCHANDRA: "रामचंद्र", MISHRA: "मिश्रा", SUNIL: "सुनील", NARAYAN: "नारायण", SHANKAR: "शंकर", RAJENDRA: "राजेंद्र",
  SUNITA: "सुनीता", JADHAV: "जाधव", LAXMAN: "लक्ष्मण", PANDURANG: "पांडुरंग", BHOIR: "भोईर", ANIL: "अनिल", PAWAR: "पवार",
  DEEPAK: "दीपक", DINESH: "दिनेश", VAITY: "वैती", NISHAD: "निषाद", RAJU: "राजू", RAVINDRA: "रवींद्र", VINOD: "विनोद",
  DILIP: "दिलीप", MOURYA: "मौर्य", CHANDRAKANT: "चंद्रकांत", SAROJ: "सरोज", JAISWAL: "जैस्वाल", PAL: "पाल", MAHADEV: "महादेव",
  KOLI: "कोळी", GHARAT: "घरत", MANOJ: "मनोज", GANESH: "गणेश", MOHAMMAD: "मोहम्मद", GAUD: "गौड", BHARTI: "भारती",
  SHARMA: "शर्मा", PANDEY: "पांडे", MAHESH: "महेश", SHAH: "शाह", MEENA: "मीना", BHARAT: "भरत", CHAVAN: "चव्हाण",
  MHATRE: "म्हात्रे", RAKESH: "राकेश", MAHENDRA: "महेंद्र", SAWANT: "सावंत", ANANT: "अनंत", RAUT: "राऊत", VASANT: "वसंत",
  GOVIND: "गोविंद", HARISHCHANDRA: "हरिश्चंद्र", LAXMI: "लक्ष्मी", LATA: "लता", ARVIND: "अरविंद", ALI: "अली", KRISHNA: "कृष्णा",
  KADAM: "कदम", KISHOR: "किशोर", SANGEETA: "संगीता", GEETA: "गीता", VILAS: "विलास", SUREKHA: "सुरेखा", SANDEEP: "संदीप",
  GANPAT: "गणपत", ANITA: "अनिता", AJAY: "अजय", CHAUHAN: "चौहान", TUKARAM: "तुकाराम", MORE: "मोरे", TANDEL: "तांडेल",
  SHANTARAM: "शांताराम", PATEL: "पटेल", SUBHASH: "सुभाष", MANISHA: "मनीषा", SHINDE: "शिंदे", GOPAL: "गोपाळ", MOHAN: "मोहन",
  JAISAWAL: "जैस्वाल", VANITA: "वनिता", MAURYA: "मौर्य", ARUN: "अरुण", SAVITA: "सविता", ASHA: "आशा", VISHWAKARMA: "विश्वकर्मा",
  ANSARI: "अन्सारी", REKHA: "रेखा", KASHINATH: "काशिनाथ", PRAMOD: "प्रमोद", JAGDISH: "जगदीश", DEVI: "देवी", VISHNU: "विष्णू",
  CHOUDHARY: "चौधरी", CHAUDHARY: "चौधरी", CHAUDHARI: "चौधरी", PRAMILA: "प्रमिला", KALPANA: "कल्पना", SITARAM: "सीताराम",
  CHOUHAN: "चौहान", RAJARAM: "राजाराम", RANJANA: "रंजना", PRAVIN: "प्रवीण", UMESH: "उमेश", VANDANA: "वंदना", DUBEY: "दुबे",
  KAMBLE: "कांबळे", MOHD: "मोहम्मद", NAIK: "नाईक", JHA: "झा", SUMAN: "सुमन", NARESH: "नरेश", JITENDRA: "जितेंद्र",
  GURAV: "गुरव", YASHWANT: "यशवंत", RAJKUMAR: "राजकुमार", MUKESH: "मुकेश", KUSHWAH: "कुशवाह", GULAB: "गुलाब", AHMED: "अहमद",
  PARVATI: "पार्वती", KUSUM: "कुसुम", SACHIN: "सचिन", BABU: "बाबू", PRADEEP: "प्रदीप", PRADIP: "प्रदीप", HEMANT: "हेमंत",
  NILESH: "नीलेश", RATHOD: "राठोड", SANGITA: "संगीता", RAGHUNATH: "रघुनाथ", RAMA: "रमा", SHOBHA: "शोभा", VASUDEV: "वासुदेव",
  KIRAN: "किरण", SONKAR: "सोनकर", MANJULA: "मंजुळा", ABDUL: "अब्दुल", JAYSHREE: "जयश्री", BIND: "बिंद", BARAF: "बरफ",
  LALITA: "ललिता", NIRMALA: "निर्मला", MANOHAR: "मनोहर", DATTARAM: "दत्ताराम", VAISHALI: "वैशाली", OMPRAKASH: "ओमप्रकाश",
  ARJUN: "अर्जुन", MADHUKAR: "मधुकर", SURENDRA: "सुरेंद्र", PRABHAKAR: "प्रभाकर", VITTHAL: "विठ्ठल", RAVI: "रवी", LAL: "लाल",
  SAKHARAM: "सखाराम", MANBHAT: "मानभट", BARI: "बारी", PUSHPA: "पुष्पा", JYOTI: "ज्योती", PARSHURAM: "परशुराम", THAKUR: "ठाकूर",
  SONU: "सोनू", VASANTI: "वासंती", ANAND: "आनंद", VARMA: "वर्मा", VERMA: "वर्मा", CHANDRA: "चंद्र", USHA: "उषा", MANGESH: "मंगेश",
  NITIN: "नितीन", DHAROLIYA: "धरोलिया", BALKRISHNA: "बाळकृष्ण", RAMDAS: "रामदास", NAMDEV: "नामदेव", KAILASH: "कैलास",
  SATISH: "सतीश", MANKAR: "मानकर", JAGANNATH: "जगन्नाथ", RESHMA: "रेश्मा", MALI: "माळी", MARUTI: "मारुती", KISAN: "किसन",
  KAVITA: "कविता", GAUTAM: "गौतम", SHYAM: "श्याम", JAYRAM: "जयराम", BABAN: "बबन", BHAGWAN: "भगवान", KAMLAKAR: "कमलाकर",
  CHOURASIYA: "चौरसिया", CHAURASIYA: "चौरसिया", DAS: "दास", CHIKHALIYA: "चिखलिया", DASHRATH: "दशरथ", GAJANAN: "गजानन",
  MOJES: "मोजेस", KAMLESH: "कमलेश", TARE: "तरे", KANOJIYA: "कनोजिया", BHAGAT: "भगत", KINI: "किणी", VIMAL: "विमल",
  JAYPRAKASH: "जयप्रकाश", PARAB: "परब", AHIRE: "अहिरे", HUSSAIN: "हुसेन", SHUKLA: "शुक्ला", MORKYA: "मोरक्या",
  ANUSAYA: "अनुसया", SAHU: "साहू", RAMU: "रामू", JAYWANT: "जयवंत", KESHAV: "केशव", SUJATA: "सुजाता", PETER: "पीटर",
  RAMAKANT: "रमाकांत", VIRENDRA: "वीरेंद्र", RAJAN: "राजन", NANDLAL: "नंदलाल", GOND: "गोंड", SUNANDA: "सुनंदा",
  YOGESH: "योगेश", RAMJI: "रामजी", SAKPAL: "सकपाळ", SURAJ: "सूरज", SONI: "सोनी", WAGHELA: "वाघेला", SARITA: "सरिता",
  HARIJAN: "हरिजन", MALTI: "मालती", MALATI: "मालती", WAGHRI: "वाघरी", WAGHARI: "वाघरी", VAGHRI: "वाघरी", NANDA: "नंदा",
  MOHITE: "मोहिते", SHRIVASTAV: "श्रीवास्तव", SANDAN: "संदन", AJIT: "अजित", PARED: "परेड", MUNNA: "मुन्ना",
  BHARATI: "भारती", GANGARAM: "गंगाराम", SALVI: "साळवी", MANDA: "मंदा", VINAYAK: "विनायक", VIJAYA: "विजया", TELI: "तेली",
  HARI: "हरी", SHAILESH: "शैलेश", SHIVRAM: "शिवराम", HEMLATA: "हेमलता", KAMAL: "कमल", KISHAN: "किशन", SHUBHANGI: "शुभांगी",
  AVINASH: "अविनाश", SOLANKI: "सोलंकी", KASHYAP: "कश्यप", LALJI: "लालजी", VISHWANATH: "विश्वनाथ", ARUNA: "अरुणा",
  HARESHWAR: "हरेश्वर", VARTAK: "वर्तक", BHALCHANDRA: "भालचंद्र", JOHNSON: "जॉन्सन", SUVARNA: "सुवर्णा", NARENDRA: "नरेंद्र",
  MANGELA: "मांगेला", BABLU: "बबलू", LEELA: "लीला", MRS: "श्रीमती", SHARAD: "शरद", PRASHANT: "प्रशांत", DALVI: "दळवी",
  RADHESHYAM: "राधेश्याम", RAI: "राय", ATMARAM: "आत्माराम", KRUSHNA: "कृष्णा", AMIT: "अमित", SHETTY: "शेट्टी", RAHUL: "राहुल",
  JAISWAR: "जैस्वार", BALU: "बाळू", SHIV: "शिव", SAHANI: "साहनी", CHAVHAN: "चव्हाण", DHARMENDRA: "धर्मेंद्र",
  SHASHIKANT: "शशिकांत", MOHANLAL: "मोहनलाल", PARMAR: "परमार", SAGAR: "सागर", POONAM: "पूनम", SANDESH: "संदेश",
  MADHU: "मधू", TARA: "तारा", NANDKUMAR: "नंदकुमार", PREMA: "प्रेमा", ROHINI: "रोहिणी", GHANSHYAM: "घनश्याम", SURVE: "सुर्वे",
  JOSHI: "जोशी", URMILA: "उर्मिला", MASTAN: "मस्तान", PUJARI: "पुजारी", SHIVSHANKAR: "शिवशंकर", UTTAM: "उत्तम",
  FATIMA: "फातिमा", CHOTELAL: "छोटेलाल", MANJU: "मंजू", BRIJESH: "ब्रिजेश", SHANTI: "शांती", FRANCIS: "फ्रान्सिस",
  SALIM: "सलीम", SHELAR: "शेलार", ARCHANA: "अर्चना", MORESHWAR: "मोरेश्वर", ANKUSH: "अंकुश", PRATAP: "प्रताप", GOUD: "गौड",
  SADANAND: "सदानंद", LALCHAND: "लालचंद", HEMA: "हेमा", YOGITA: "योगिता", BHASKAR: "भास्कर", DAMODAR: "दामोदर",
  MADAN: "मदन", DHANANJAY: "धनंजय", UMASHANKAR: "उमाशंकर", HASHMI: "हाश्मी", SHAKUNTALA: "शकुंतला", MAMTA: "ममता",
  RUPESH: "रूपेश", SHIVKUMAR: "शिवकुमार", BABULAL: "बाबुलाल", VIKAS: "विकास", EKNATH: "एकनाथ", OGANIYA: "ओगानिया",
  BABURAO: "बाबुराव", RANE: "राणे", NIRMAL: "निर्मल", KANTA: "कांता", RITA: "रीता", CHANDRAKALA: "चंद्रकला", KANDU: "कांडू",
  RAJ: "राज", SHIVA: "शिवा", HIRALAL: "हिरालाल", RAMLAKHAN: "रामलखन", SHIVAJI: "शिवाजी", GAIKWAD: "गायकवाड",
  AGNEL: "अॅग्नेल", DIPAK: "दीपक", SUSHMA: "सुषमा", POOJA: "पूजा", SUSHILA: "सुशीला", TALEKAR: "तळेकर", GAWAD: "गावड",
  BHANA: "भाना", JANARDAN: "जनार्दन", SHRIDHAR: "श्रीधर", DHODI: "धोडी", SAH: "साह", KANCHAN: "कांचन", TAMBE: "तांबे",
  DHIRU: "धीरू", GURUNATH: "गुरुनाथ", MAHADIK: "महाडिक", GIRI: "गिरी", MEVALAL: "मेवालाल", ITUR: "इतुर", DAMYANTI: "दमयंती",
  DATTARAY: "दत्तात्रय", DATTATRAY: "दत्तात्रय", SUDHAKAR: "सुधाकर", JAGAN: "जगन", SMITA: "स्मिता", RADHA: "राधा", HIRA: "हिरा",
  ROHIT: "रोहित", KORI: "कोरी", ASHWINI: "अश्विनी", HANSA: "हंसा", CHANDAN: "चंदन",
  MONDAL: "मंडल", DESAI: "देसाई", MISAL: "मिसाळ", TAPAS: "तपस", VIJAYKRISHNA: "विजयकृष्ण", BHATKAR: "भाटकर", JAGAT: "जगत",
};

/* ── Eka akshari initials: "M.B" → "एम.बी" ── */
const LETTER_NAMES = {
  A: "ए", B: "बी", C: "सी", D: "डी", E: "ई", F: "एफ", G: "जी", H: "एच", I: "आय", J: "जे", K: "के", L: "एल", M: "एम",
  N: "एन", O: "ओ", P: "पी", Q: "क्यू", R: "आर", S: "एस", T: "टी", U: "यू", V: "व्ही", W: "डब्ल्यू", X: "एक्स", Y: "वाय", Z: "झेड",
};

/* ── TUMCHI DURUSTI YAADI ──
   Card var ekhada shabd chukicha disla tar ithe add kara: ENGLISH (capital) : "मराठी".
   Hi yaadi sagalyat aadhi vaprli jate. */
const CUSTOM_WORDS = {
  // KHAU: "खाऊ",
};

/* NR POLICE STATION → पोलीस स्टेशन जवळ (Marathi madhe he shabd shevti yetat) */
const POSTPOSITIONS = { NR: "जवळ", NEAR: "जवळ", OPP: "समोर", OPPOSITE: "समोर", BEHIND: "मागे", BHD: "मागे" };


/* ── Google transliteration (browser) + cache ── */
const CACHE_KEY = "svms-mr-xlit-cache-v2"; // v2: juna chukicha cache vaprla jat nahi
const cache = (() => {
  try {
    return new Map(Object.entries(JSON.parse(localStorage.getItem(CACHE_KEY) || "{}")));
  } catch {
    return new Map();
  }
})();

let saveTimer = null;
function saveCache() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(Object.fromEntries(cache)));
    } catch {
      /* storage bharla / band asel tar ignore */
    }
  }, 300);
}

function jsonp(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const cb = `__svmsXlit_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("timeout"));
    }, timeoutMs);
    function cleanup() {
      clearTimeout(timer);
      delete window[cb];
      script.remove();
    }
    window[cb] = (data) => {
      cleanup();
      resolve(data);
    };
    script.onerror = () => {
      cleanup();
      reject(new Error("jsonp failed"));
    };
    script.src = `${url}&cb=${cb}`;
    document.head.appendChild(script);
  });
}

const pending = new Map(); // ekach shabd ekach vela vicharla jato

async function googleXlit(word) {
  const key = word.toLowerCase();
  if (cache.has(key)) return cache.get(key);
  if (pending.has(key)) return pending.get(key);

  const url = `https://inputtools.google.com/request?text=${encodeURIComponent(key)}&itc=mr-t-i0-und&num=1&cp=0&cs=1&ie=utf-8&oe=utf-8`;
  const pick = (data) => (data?.[0] === "SUCCESS" ? data?.[1]?.[0]?.[1]?.[0] : null);

  const job = (async () => {
    let out = null;
    try {
      const res = await fetch(url);
      out = pick(await res.json());
    } catch {
      try {
        out = pick(await jsonp(url)); // fetch block jhala (CORS) tar JSONP
      } catch {
        out = null;
      }
    }
    if (out) {
      cache.set(key, out);
      saveCache();
      return out;
    }
    return word; // convert nahi jhala → English tasach
  })();

  pending.set(key, job);
  try {
    return await job;
  } finally {
    pending.delete(key);
  }
}

async function xlitWord(word, dict) {
  if (!/[a-z]/i.test(word)) return word;
  const upper = word.toUpperCase();
  if (CUSTOM_WORDS[upper]) return CUSTOM_WORDS[upper];
  if (dict && dict[upper]) return dict[upper];
  if (dict !== BUSINESS_WORDS && NAME_WORDS[upper]) return NAME_WORDS[upper];
  if (upper.length === 1 && LETTER_NAMES[upper]) return LETTER_NAMES[upper];
  // "XYZWALA" → "<XYZ>वाला"
  if (dict === BUSINESS_WORDS && /^[A-Z]{3,}(WALA|VALA)$/.test(upper)) {
    const base = upper.slice(0, -4);
    return `${dict[base] || (await googleXlit(base))}वाला`;
  }
  return googleXlit(word);
}

const INNER_SEP = /([.\-(){}\[\]\/&:;+]+)/;

async function xlitToken(token, dict) {
  if (/[\u0900-\u097F]/.test(token)) return token; // aadhich Marathi
  if (/\d/.test(token)) return token; // flat / room no. (A/01, E/1, 12-B) jase aahet tase
  const parts = token.split(INNER_SEP);
  const out = [];
  for (const p of parts) out.push(p === "" || INNER_SEP.test(p) ? p : await xlitWord(p, dict));
  return out.join("");
}

async function xlitSegment(segment, dict, usePostpositions) {
  const words = segment.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  let tail = "";
  const first = words[0].toUpperCase().replace(/\.$/, "");
  if (usePostpositions && words.length > 1 && POSTPOSITIONS[first]) {
    words.shift();
    tail = POSTPOSITIONS[first];
  }
  const out = [];
  for (const w of words) out.push(await xlitToken(w, dict));
  return tail ? `${out.join(" ")} ${tail}` : out.join(" ");
}

/* kind: "name" | "business" | "address" */
async function toMarathi(text, kind = "name") {
  if (!text || !String(text).trim()) return "";
  let src = String(text).trim();
  let dict = null;

  if (kind === "business") {
    dict = BUSINESS_WORDS;
    src = src.toUpperCase();
    for (const [re, mr] of BUSINESS_PHRASES) src = src.replace(re, mr);
  } else if (kind === "address") {
    dict = ADDRESS_WORDS;
  }

  const segments = src.split(",");
  const out = [];
  for (const seg of segments) out.push(await xlitSegment(seg, dict, kind === "address"));
  let result = out
    .filter((s, i) => s || i === 0)
    .join(", ");

  if (kind === "business") {
    result = result
      .replace(/फळे (वाला|विक्रेता)/g, "फळ $1")
      .replace(/फुले वाला/g, "फुलवाला")
      .replace(/फुले माळा/g, "फुलमाळा")
      .replace(/भाजीपाला वाला/g, "भाजीवाला")
      .replace(/ वाला(?=\s|,|$)/g, "वाला"); // "टोमॅटो वाला" → "टोमॅटोवाला"
  }
  return result
    .replace(/\{\s*(\([पू]+\))\s*\}/g, " $1") // {W} → (प)
    .replace(/\s+([.,])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}


/* =====================================================================
   HOOK — card component madhe vapra:
     const mr = useMarathiVendor(vendor);
     mr.fullName, mr.businessType, mr.workingAddress, mr.permanentAddress
   Marathi tayar hoiparyant English value parat karto.
   ===================================================================== */
/* =====================================================================
   MARATHI ANKA (०१२...) — FONT FIX
   Card cha "Poppins" font madhe Marathi ankanchi chitre English ankanchich copy aahet
   (० → 0, १ → 1 ...). Mhanun fakta ० ते ९ ya ankansathi (U+0966–096F) dusra
   Devanagari font vaprla jato. Baki sagla text Poppins madhech rahto — design badalat nahi.
   ===================================================================== */
const DIGIT_RANGE = "U+0966-096F";
const DIGIT_FONT_LOCAL_ID = "svms-mr-digits-local";
const DIGIT_FONT_REMOTE_ID = "svms-mr-digits-remote";

function ensureMarathiDigitFont() {
  if (typeof document === "undefined") return;

  // 1) Computer madhe asalele Devanagari fonts (Windows: Nirmala UI / Mangal, Android/Linux: Noto, Mac: Kohinoor)
  if (!document.getElementById(DIGIT_FONT_LOCAL_ID)) {
    const regular = `local("Noto Sans Devanagari"), local("NotoSansDevanagari-Regular"), local("Nirmala UI"), local("NirmalaUI"), local("Mangal"), local("Kohinoor Devanagari")`;
    const bold = `local("Noto Sans Devanagari Bold"), local("NotoSansDevanagari-Bold"), local("Nirmala UI Bold"), local("NirmalaUI-Bold"), local("Mangal Bold"), local("Kohinoor Devanagari Bold"), ${regular}`;
    const style = document.createElement("style");
    style.id = DIGIT_FONT_LOCAL_ID;
    style.textContent = `
      @font-face { font-family: "Poppins"; src: ${regular}; font-weight: 100 599; unicode-range: ${DIGIT_RANGE}; }
      @font-face { font-family: "Poppins"; src: ${bold}; font-weight: 600 900; unicode-range: ${DIGIT_RANGE}; }
    `;
    document.head.appendChild(style);
  }

  // 2) Google Fonts varun "Noto Sans Devanagari" che fakta 10 anka (sagalya computers var chalel)
  if (!document.getElementById(DIGIT_FONT_REMOTE_ID)) {
    const marker = document.createElement("style");
    marker.id = DIGIT_FONT_REMOTE_ID;
    document.head.appendChild(marker);

    const url =
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap&text=" +
      encodeURIComponent("०१२३४५६७८९");
    fetch(url)
      .then((res) => (res.ok ? res.text() : ""))
      .then((css) => {
        if (!css) return;
        marker.textContent = css
          .replace(/font-family:\s*['"]Noto Sans Devanagari['"];/g, 'font-family: "Poppins";')
          .replace(/@font-face\s*{/g, `@font-face { unicode-range: ${DIGIT_RANGE};`);
      })
      .catch(() => {
        /* internet nasel tar varcha (1) local font vaprla jail */
      });
  }
}

export function useMarathiVendor(vendor) {
  useEffect(() => {
    ensureMarathiDigitFont();
  }, []);

  const english = {
    fullName: vendor?.personal?.fullName || "",
    businessType: vendor?.business?.businessType || "",
    workingAddress: vendor?.address?.workingAddress || "",
    permanentAddress: vendor?.address?.permanentAddress || "",
  };
  const sourceKey = JSON.stringify(english);
  const [state, setState] = useState({ key: "", values: null });

  useEffect(() => {
    if (!vendor) return undefined;
    let cancelled = false;
    Promise.all([
      toMarathi(english.fullName, "name"),
      toMarathi(english.businessType, "business"),
      toMarathi(english.workingAddress, "address"),
      toMarathi(english.permanentAddress, "address"),
    ])
      .then(([fullName, businessType, workingAddress, permanentAddress]) => {
        if (!cancelled) {
          setState({ key: sourceKey, values: { fullName, businessType, workingAddress, permanentAddress } });
        }
      })
      .catch(() => {
        /* error aala tar English ch disel */
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceKey]);

  const ready = state.key === sourceKey && !!state.values;
  const values = ready ? state.values : {};
  return {
    ready,
    fullName: values.fullName || english.fullName,
    businessType: values.businessType || english.businessType,
    workingAddress: values.workingAddress || english.workingAddress,
    permanentAddress: values.permanentAddress || english.permanentAddress,
  };
}

/* =====================================================================
   SYNC HELPERS
   ===================================================================== */
const MR_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];

/* 8007747550 → ८००७७४७५५० */
export function mrDigits(value) {
  if (value === null || value === undefined || value === "") return value;
  return String(value).replace(/\d/g, (d) => MR_DIGITS[d]);
}

/* "Ward A" → "प्रभाग अ" */
const WARD_LETTERS = { A: "अ", B: "ब", C: "क", D: "ड", E: "ई", F: "फ", G: "ग", H: "ह", I: "आय" };

export function wardMr(vendor) {
  const ward = vendor?.address?.ward || vendor?.ward;
  if (!ward) return "-";
  const letter = String(ward).replace(/ward/i, "").replace(/[^a-z]/gi, "").toUpperCase();
  return WARD_LETTERS[letter] ? `प्रभाग ${WARD_LETTERS[letter]}` : ward;
}

/* 23 Sept 2026 → २३ सप्टेंबर २०२६  (browser locale var avalambun nahi — nehami saarkhach) */
const MONTHS_MR = [
  "जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून",
  "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर",
];

export function dateMr(d) {
  if (!d) return "-";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  return `${mrDigits(day)} ${MONTHS_MR[date.getMonth()]} ${mrDigits(date.getFullYear())}`;
}

/* Vel che sagle formats (tumchya DB madhle):
   "09:00 AM to 09:30 PM", "09:00 am to 10.00pm", "07 AM to 06 PM", "10AM - 6PM", "10 to 8", "8 to 4"
   → "सकाळी ०९:०० ते रात्री ०९:३०" */
function partOfDay(h24) {
  if (h24 < 4) return "रात्री";
  if (h24 < 12) return "सकाळी";
  if (h24 < 17) return "दुपारी";
  if (h24 < 19) return "सायं.";
  return "रात्री";
}

export function timingMr(timing) {
  if (!timing) return "-";
  const re = /(\d{1,3})(?:\s*[:.]\s*(\d{2}))?\s*(AM|PM)?/gi;
  const parsed = [];
  let m;
  while ((m = re.exec(timing)) !== null) {
    const h = parseInt(m[1], 10);
    if (h > 23) return timing; // chukiche data (udaharnarth "109.00pm") → jasa aahe tasa
    parsed.push({ h, min: m[2] || "00", ampm: (m[3] || "").toUpperCase() });
  }
  if (!parsed.length || parsed.length > 2) return timing;

  // "10 to 8", "4 to 7" (AM/PM nahi): suruvat 1-6 → sandhyakali, shevat → PM
  const noAmPm = parsed.every((t) => !t.ampm);

  const times = parsed.map((t, i) => {
    let h = t.h;
    if (t.ampm === "PM" && h < 12) h += 12;
    else if (t.ampm === "AM" && h === 12) h = 0;
    else if (noAmPm && i === 0 && h >= 1 && h <= 6) h += 12;
    else if (noAmPm && i === 1 && h < 12) h += 12;
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${partOfDay(h)} ${mrDigits(String(h12).padStart(2, "0"))}:${mrDigits(t.min)}`;
  });
  return times.join(" ते ");
}