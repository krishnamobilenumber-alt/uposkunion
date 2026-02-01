document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Handle Registration Form
    // DIAGNOSTIC ALERT - REMOVE AFTER FIX
    // alert("System Updated to v3.2 - New Code Loaded"); 

    const regForm = document.getElementById('registrationForm');
    // Global State for Photos
    let photoBase64 = "";
    let sigBase64 = "";
    if (regForm) {
        // --- Photo Preview and Base64 Logic --- //
        const blockData = {
            "Agra": ["Achhnera", "Akola", "Bah", "Barauli Ahir", "Bichpuri", "Etimadpur", "Fatehabad", "Fatehpur Sikri", "Jagner", "Kheragarh", "Pinahat", "Saiyan", "Shamshabad", "Khandauli", "Barauli"],
            "Aligarh": ["Atrauli", "Chandaus", "Gonda", "Iglas", "Jawan Sikanderpur", "Khair", "Lodh", "Tappal", "Akshraward", "Dhanipur", "Gangiri", "Bijauli"],
            "Prayagraj": ["Jasra", "Shankargarh", "Pratappur", "Saidabad", "Dhanupur", "Handia", "Chaka", "Karchhana", "Kaundhiyara", "Koraon", "Uruwa", "Meja", "Manda", "Bahariya", "Phulpur", "Soraon", "Holagarh", "Mauharna", "Shringverpur Dham", "Sewaith"],
            "Ambedkar Nagar": ["Akbarpur", "Baskhari", "Bhiyao", "Jalalpur", "Katehari", "Ramnagar", "Tanda", "Jahangir Ganj", "Ram Nagar"],
            "Amethi": ["Amethi", "Bhadar", "Gauriganj", "Musafirkhana", "Shahgarh", "Shukul Bazar", "Singhpur", "Jagdishpur", "Tiloi"],
            "Amroha": ["Amroha", "Dhanaura", "Gajraula", "Gangeshwari", "Hasanpur", "Joya"],
            "Auraiya": ["Achyalda", "Auraiya", "Bhagyayanagar", "Bidhuna", "Erwa Katra", "Sahar", "Bidhuna"],
            "Ayodhya": ["Amaniganj", "Bikapur", "Haringtonganj", "Masodha", "Maya Bazar", "Milkipur", "Pura Bazar", "Rudauli", "Sohawal", "Tarun"],
            "Azamgarh": ["Ahiraula", "Atraulia", "Azmatgarh", "Bilariaganj", "Jahanaganj", "Lalganj", "Maharajganj", "Martinganj", "Mehnagar", "Mirzapur", "Mohammadpur", "Palhana", "Pawai", "Phulpur", "Rani Ki Sarai", "Sathiyaon", "Tahbarpur", "Tarwa", "Thekma"],
            "Baghpat": ["Baghpat", "Baraut", "Binauli", "Chhaprauli", "Khekra", "Pilana"],
            "Bahraich": ["Balha", "Chittaura", "Fakharpur", "Huzoorpur", "Jarwal", "Kaisarganj", "Mahasi", "Mihinpurwa", "Nawabganj", "Payagpur", "Phakharpur", "Risia", "Shivpur", "Tejwapur", "Visheshwarganj"],
            "Ballia": ["Bansdih", "Bairia", "Belhari", "Beruarbari", "Chilkahar", "Dubhar", "Garwar", "Hanumanganj", "Maniar", "Murlichhapra", "Nagra", "Pandah", "Rasra", "Ratsar Kalan", "Reoti", "Siar", "Sohao"],
            "Balrampur": ["Balrampur", "Gainsari", "Harriya Satgharwa", "Pachperwa", "Rehra Bazar", "Shridattganj", "Tulsipur", "Utraula"],
            "Banda": ["Badausa", "Babatpur", "Bisanda", "Jaspura", "Kamasin", "Mahua", "Naraini", "Oran", "Pailani", "Tindwari"],
            "Barabanki": ["Banki", "Masauli", "Dewa", "Harakh", "Fatehpur", "Haidergarh", "Dariyabad", "Suratganj", "Siddhaur", "Pure Dalai", "Nindura", "Trivediganj", "Ramnagar", "Sirauli Ghauspur", "Banikodar"],
            "Bareilly": ["Aalamganj", "Aonla", "Baheri", "Bhadpura", "Bhojipura", "Bithri Chainpur", "Faridpur", "Fatehganj Paschim", "Kyara", "Majhgawan", "Mirganj", "Nawabganj", "Ramnagar", "Richha", "Shergarh"],
            "Basti": ["Bahadurpur", "Bankati", "Basti", "Dubauliya", "Gaur", "Harraiya", "Kaptanganj", "Kudaraha", "Paras Rampur", "Ramnagar", "Rudhauli", "Saltaua Gopalpur", "Sau Ghat", "Vikram Jot"],
            "Bhadohi": ["Abholi", "Aurai", "Bhadohi", "Deegh", "Gyanpur", "Suriyawan"],
            "Bijnor": ["Afzalgarh", "Dhampur", "Haldaur", "Jalilpur", "Kiratpur", "Kotwali", "Mohammadpur Deomal", "Najibabad", "Nehtaur", "Noorpur", "Seohara"],
            "Budaun": ["Ambiapur", "Asafpur", "Bilsi", "Binawar", "Bisauli", "Dahgavan", "Dataganj", "Islamnagar", "Jagat", "Miyanganj", "Sahaswan", "Salarpur", "Samrer", "Ujhani", "Wazirganj"],
            "Bulandshahr": ["Agauta", "Anupshahr", "Arniya", "B.B. Nagar", "Bulandshahr", "Danpur", "Debai", "Gulaothi", "Jahangirabad", "Khurja", "Lakhaoti", "Pahasu", "Shikarpur", "Siyana", "Sikandrabad", "Unchagaon"],
            "Chandauli": ["Barhani", "Chakia", "Chandauli", "Niyamtabad", "Naugarh", "Sakaldiha", "Shahabganj"],
            "Chitrakoot": ["Karwi", "Manikpur", "Mau", "Pahari", "Ramnagar"],
            "Deoria": ["Baitalpur", "Bankata", "Barhaj", "Bhaluani", "Bhatni", "Bhatpar Rani", "Deoria", "Desahi Deoria", "Gauri Bazar", "Lar", "Pathardewa", "Rampur Karkhana", "Rudrapur", "Salempur", "Tarkulwa"],
            "Etah": ["Aliganj", "Awagarh", "Etah", "Jaithara", "Jalesar", "Marehra", "Nidhauli Kalan", "Sakit"],
            "Etawah": ["Barhpura", "Basrehar", "Bharthana", "Chakarnagar", "Jaswantnagar", "Mahewa", "Saifai", "Takha"],
            "Farrukhabad": ["Barhpur", "Kaimganj", "Kamalganj", "Mohammadabad", "Nawabganj", "Rajepur", "Shamsabad"],
            "Fatehpur": ["Airayan", "Asothar", "Bahua", "Bhitaura", "Deomai", "Dhata", "Haswa", "Hathgam", "Khajuha", "Malwan", "Teliyani", "Vijayipur"],
            "Firozabad": ["Arawon", "Eka", "Firozabad", "Hathwant", "Jasrana", "Kheragarh", "Madanpur", "Narkhi", "Shikohabad", "Sirsaganj", "Tundla"],
            "Gautam Buddha Nagar": ["Bisrakh", "Dadri", "Jewar", "Dankaur"],
            "Ghaziabad": ["Bhojpur", "Loni", "Muradnagar", "Razapur"],
            "Ghazipur": ["Barachawar", "Bhanwarkol", "Deokali", "Ghazipur", "Jakhanian", "Karanda", "Kasimabad", "Manihari", "Mardah", "Mohammadabad", "Reotipur", "Saidpur", "Zamania"],
            "Gonda": ["Babhanjot", "Belsar", "Chhapia", "Colonelganj", "Haldharmau", "Itiathok", "Jhanjhari", "Katra Bazar", "Mankapur", "Mujehana", "Nawabganj", "Pandri Kripal", "Paraspur", "Rupaidih", "Tarabganj", "Wazirganj"],
            "Gorakhpur": ["Bansgaon", "Belghat", "Bhathat", "Brahmpur", "Campierganj", "Chargawan", "Gagaha", "Gola", "Jungle Kauria", "Kauriram", "Khajni", "Pali", "Pipraich", "Piprauli", "Sahjanwa", "Sardar Nagar", "Uruwa"],
            "Hamirpur": ["Gohand", "Kurara", "Maudaha", "Muskara", "Rath", "Sarila", "Sumerpur"],
            "Hapur": ["Dhaulana", "Garhmukteshwar", "Hapur", "Simbaoli"],
            "Hardoi": ["Ahirori", "Behandar", "Bharawan", "Bharkhani", "Bilgram", "Hariyawan", "Harpalpur", "Kachhauna", "Kothawan", "Madhouganj", "Mallawan", "Pali", "Pihani", "Sandila", "Shahabad", "Sursa", "Tadiyawan", "Todarpur"],
            "Hathras": ["Hathras", "Mursan", "Sadabad", "Sahpau", "Sasni", "Sikandra Rao"],
            "Jalaun": ["Dakore", "Jalaun", "Kadaura", "Konch", "Kuthaund", "Madhougarh", "Maheva", "Nadigaon", "Rampura"],
            "Jaunpur": ["Badlapur", "Baksha", "Dharmapur", "Dobhi", "Jalalpur", "Karanjakala", "Kerakat", "Khutahan", "Maharajganj", "Mariahu", "Muftiganj", "Mungra Badshahpur", "Ramnagar", "Rampur", "Shahganj", "Sikrara", "Sirakoni", "Sujanganj"],
            "Jhansi": ["Babina", "Badagaon", "Bamaur", "Bangra", "Chirgaon", "Gursarai", "Mauranipur", "Moth"],
            "Kannauj": ["Chhibramau", "Gughrapur", "Haseran", "Jalalabad", "Kannauj", "Saurikh", "Talgram", "Umarda"],
            "Kanpur Dehat": ["Akbarpur", "Amraaudha", "Derapur", "Jhinjhak", "Maitha", "Malasa", "Rajpur", "Rasulabad", "Sandapur", "Sarbankhera"],
            "Kanpur Nagar": ["Bidhnu", "Chaubepur", "Ghatampur", "Kalyanpur", "Patara", "Sarsaul", "Shivrajpur", "Bhitargaon"],
            "Kasganj": ["Amanpur", "Ganjdundwara", "Kasganj", "Patiyali", "Sahawar", "Soron", "Sidhpura"],
            "Kaushambi": ["Chail", "Kaushambi", "Manjhanpur", "Mooratganj", "Nevil", "Sarsawan", "Sirathu"],
            "Kushinagar": ["Dudhai", "Fazilnagar", "Hata", "Kaptanganj", "Kasaya", "Khadda", "Motichak", "Nebua Naurangia", "Padrauna", "Ramkola", "Seorahi", "Sukrauli", "Tamkuhi Raj", "Vishunpura"],
            "Lakhimpur Kheri": ["Bankeyganj", "Bejam", "Bijua", "Dhaurahra", "Isanagar", "Kheri", "Kumbhi", "Lakhimpur", "Mihila", "Nighasan", "Nakaha", "Pallia", "Pasgawan", "Phoolbehar", "Ramia Behar"],
            "Lalitpur": ["Birdha", "Jakhaura", "Madawara", "Mahroni", "Talbehat", "Bar"],
            "Lucknow": ["Bakshi Ka Talab", "Chinhat", "Gosainganj", "Kakori", "Mall", "Malihabad", "Mohanlalganj", "Sarojini Nagar"],
            "Maharajganj": ["Brijmanganj", "Dhani", "Ghughuli", "Laxmipur", "Maharajganj", "Mithaura", "Nichlaul", "Paniyara", "Pharenda", "Ratanpur", "Siswa"],
            "Mahoba": ["Charkhari", "Jaitpur", "Kabrai", "Panwari"],
            "Mainpuri": ["Barnahal", "Bewar", "Eka", "Ghiror", "Jageer", "Karhal", "Kishni", "Kuraoli", "Mainpuri", "Sultanganj"],
            "Mathura": ["Baldeo", "Chhata", "Chaumuha", "Farah", "Govardhan", "Mathura", "Nandgaon", "Naujhil", "Raya"],
            "Mau": ["Badraon", "Doharighat", "Fatehpur Madaun", "Ghosi", "Kopaganj", "Mohammadabad Gohna", "Pardaha", "Ratanpura"],
            "Meerut": ["Daurala", "Hastinapur", "Janikhurd", "Kharkhoda", "Machhra", "Mawana", "Meerut", "Parikshitgarh", "Rajpura", "Rohta", "Sardhana", "Sarurpur Khurd"],
            "Mirzapur": ["City", "Chanbey", "Hallia", "Jamalpur", "Kon", "Lalganj", "Majhawan", "Narayanpur", "Pahari", "Patehara Kalan", "Rajgarh", "Sikhar"],
            "Moradabad": ["Bhagatpur Tanda", "Chhajlet", "Dilari", "Kundarki", "Moradabad", "Munda Pandey", "Bilari", "Kanth", "Thakurdwara"],
            "Muzaffarnagar": ["Baghra", "Budhana", "Charthawal", "Jansath", "Kandhla", "Khatauli", "Muzaffarnagar", "Purqazi", "Shahpur", "Shamli", "Thana Bhawan"],
            "Pilibhit": ["Amariya", "Barkhera", "Bilsanda", "Bisalpur", "Lalaurikhera", "Marauri", "Puranpur"],
            "Pratapgarh": ["Babaganj", "Belghat", "Bihar", "Gaura", "Kala Kankar", "Kunda", "Lakshmanpur", "Mandhata", "Mangraura", "Patty", "Pratapgarh City", "Rajapur", "Sada", "Sandwa Chandrika", "Sangipur"],
            "Raebareli": ["Amawan", "Bachhrawan", "Deenshah Gaura", "Dih", "Harchandpur", "Jagatpur", "Lalganj", "Maharajganj", "Naseerabad", "Rahi", "Rohaniya", "Sareni", "Sataon", "Sivgarh", "Unchahar"],
            "Rampur": ["Bilaspur", "Chamrawa", "Milak", "Saidnagar", "Shahabad", "Suar"],
            "Saharanpur": ["Baliakheri", "Gangoh", "Nanauta", "Purowala", "Rampur Maniharan", "Sadauli Qadeem", "Sarsawa", "Muzaffarabad", "Naggal"],
            "Sambhal": ["Asmoli", "Bahjoi", "Baniyather", "Gunnaur", "Junawai", "Panwasa", "Rajpura", "Sambhal"],
            "Sant Kabir Nagar": ["Baghauli", "Belhar Kala", "Hainsar Bazar", "Khalilabad", "Mehdawal", "Nath Nagar", "Pauli", "Santha", "Semariyawan"],
            "Shahjahanpur": ["Banda", "Bawarkhera", "Dadrol", "Jalalabad", "Jaitipur", "Kanth", "Katra", "Khutar", "Madnapur", "Mirzapur", "Nigohi", "Powayan", "Sindhauli", "Tilhar"],
            "Shamli": ["Kairana", "Kandhla", "Shamli", "Thana Bhawan", "Un"],
            "Shravasti": ["Gilaula", "Hariharpur Rani", "Ikauna", "Jamunaha", "Sirsiya"],
            "Siddharthnagar": ["Bansi", "Barhani Bazar", "Birdpur", "Domariaganj", "Itwa", "Jogiya", "Khesraha", "Khuniyaon", "Lotan", "Mithwal", "Naugarh", "Shohratgarh", "Uska Bazar"],
            "Sitapur": ["Ailiya", "Behta", "Biswan", "Gondlamau", "Hargaon", "Kasmanda", "Khairabad", "Laharpur", "Machhrehta", "Mahmudabad", "Maholi", "Misrikh", "Pahala", "Pisawan", "Reusa", "Sakaran", "Sidhauli"],
            "Sonbhadra": ["Babhani", "Chatra", "Chopan", "Duddhi", "Ghorawal", "Myorpur", "Nagwa", "Robertsganj"],
            "Sultanpur": ["Akhand Nagar", "Bhadaiya", "Dhanpatganj", "Dubepur", "Jai Singh Pur", "Kurebhar", "Kurwar", "Lambhua", "Motigarpur", "Pratap Pur Kamraicha"],
            "Unnao": ["Asoha", "Auras", "Bangarmau", "Bichhiya", "Bighapur", "Fatehpur Chaurasi", "Ganj Moradabad", "Hasanganj", "Hilauli", "Miyanganj", "Nawabganj", "Purwa", "Safipur", "Sumerpur"],
            "Varanasi": ["Arajiline", "Baragaon", "Chiraigaon", "Cholapur", "Harhua", "Kashi Vidyapeeth", "Pindra", "Sewapuri"]
        };

        // --- TEHSIL DATA ---
        const tehsilData = {
            "Agra": ["Agra", "Etmadpur", "Kiraoli", "Kheragarh", "Fatehabad", "Bah"],
            "Aligarh": ["Koil", "Khair", "Atrauli", "Iglas", "Gabhana"],
            "Prayagraj": ["Soraon", "Phulpur", "Handia", "Karchhana", "Bara", "Meja", "Koraon", "Sadar"],
            "Ambedkar Nagar": ["Akbarpur", "Tanda", "Jalalpur", "Alapur", "Bhiti"],
            "Amethi": ["Gauriganj", "Amethi", "Musafirkhana", "Tiloi"],
            "Amroha": ["Amroha", "Dhanaura", "Hasanpur"],
            "Auraiya": ["Auraiya", "Bidhuna", "Ajitmal"],
            "Ayodhya": ["Sadar", "Rudauli", "Milkipur", "Sohawal", "Bikapur"],
            "Azamgarh": ["Azamgarh", "Sagri", "Lalganj", "Phulpur", "Burhanpur", "Nizambad", "Mehnagar"],
            "Baghpat": ["Baghpat", "Baraut", "Khekra"],
            "Bahraich": ["Bahraich", "Nanpara", "Kaisarganj", "Mahasi", "Payagpur", "Mihinpurwa"],
            "Ballia": ["Ballia", "Rasra", "Bairia", "Bansdih", "Sikanderpur", "Belthara Road"],
            "Balrampur": ["Balrampur", "Tulsipur", "Utraula"],
            "Banda": ["Banda", "Naraini", "Baberu", "Atarra"],
            "Barabanki": ["Nawabganj", "Fatehpur", "Ramsanehi Ghat", "Haidergarh", "Ram Nagar", "Sirauli Ghauspur"],
            "Bareilly": ["Bareilly", "Baheri", "Faridpur", "Aonla", "Meerganj", "Nawabganj"],
            "Basti": ["Basti", "Harraiya", "Bhanpur", "Rudhauli"],
            "Bhadohi": ["Bhadohi", "Gyanpur", "Aurai"],
            "Bijnor": ["Bijnor", "Najibabad", "Dhampur", "Nagina", "Chandpur"],
            "Budaun": ["Budaun", "Dataganj", "Bisauli", "Sahaswan", "Bilsi"],
            "Bulandshahr": ["Bulandshahr", "Siana", "Anupshahr", "Debai", "Shikarpur", "Khurja", "Sikandrabad"],
            "Chandauli": ["Chandauli", "Sakaldiha", "Chakia", "Mughal Sarai", "Naugarh"],
            "Chitrakoot": ["Karwi", "Mau"],
            "Deoria": ["Deoria", "Salempur", "Rudrapur", "Bhatpar Rani", "Barhaj"],
            "Etah": ["Etah", "Jalesar", "Aliganj"],
            "Etawah": ["Etawah", "Bharthana", "Jaswantnagar", "Saifai", "Chakarnagar"],
            "Farrukhabad": ["Farrukhabad", "Kaimganj", "Amritpur"],
            "Fatehpur": ["Fatehpur", "Bindki", "Khaga"],
            "Firozabad": ["Firozabad", "Shikohabad", "Jasrana", "Tundla", "Sirsaganj"],
            "Gautam Buddha Nagar": ["Sadar", "Dadri", "Jewar"],
            "Ghaziabad": ["Ghaziabad", "Loni", "Modi Nagar"],
            "Ghazipur": ["Ghazipur", "Mohammadabad", "Zamania", "Saidpur", "Jakhanian", "Sevurai", "Kasimabad"],
            "Gonda": ["Gonda", "Colonelganj", "Tarabganj", "Mankapur"],
            "Gorakhpur": ["Sadar", "Campierganj", "Sahjanwa", "Khajni", "Bansgaon", "Chauri Chaura", "Gola"],
            "Hamirpur": ["Hamirpur", "Rath", "Maudaha", "Sarila"],
            "Hapur": ["Hapur", "Garhmukteshwar", "Dhaulana"],
            "Hardoi": ["Hardoi", "Shahabad", "Sawayajpur", "Bilgram", "Sandila"],
            "Hathras": ["Hathras", "Sadabad", "Sikandra Rao", "Sasni"],
            "Jalaun": ["Orai", "Jalaun", "Konch", "Kalpi", "Madhogarh"],
            "Jaunpur": ["Jaunpur", "Shahganj", "Machhlishahr", "Mariahu", "Kerakat", "Badlapur"],
            "Jhansi": ["Jhansi", "Mauranipur", "Garautha", "Moth", "Tahrauli"],
            "Kannauj": ["Kannauj", "Chhibramau", "Tirwa"],
            "Kanpur Dehat": ["Akbarpur", "Bhognipur", "Derapur", "Rasulabad", "Sikandra", "Maitha"],
            "Kanpur Nagar": ["Sadar", "Bilhaur", "Ghatampur"],
            "Kasganj": ["Kasganj", "Patiyali", "Sahawar"],
            "Kaushambi": ["Manjhanpur", "Sirathu", "Chail"],
            "Kushinagar": ["Padrauna", "Hata", "Tamkuhi Raj", "Kasya", "Kaptanganj", "Khadda"],
            "Lakhimpur Kheri": ["Lakhimpur", "Mohammadi", "Palia", "Nighasan", "Dhaurahra", "Gola", "Kheri"],
            "Lalitpur": ["Lalitpur", "Talbehat", "Mahroni", "Madawara", "Pali"],
            "Lucknow": ["Sadar", "Malihabad", "Bakshi Ka Talab", "Mohanlalganj", "Sarojini Nagar"],
            "Maharajganj": ["Maharajganj", "Nautanwa", "Nichlaul", "Pharenda"],
            "Mahoba": ["Mahoba", "Charkhari", "Kulpahar"],
            "Mainpuri": ["Mainpuri", "Karhal", "Bhogaon", "Kishni"],
            "Mathura": ["Mathura", "Goverdhan", "Chhata", "Mant", "Mahavan"],
            "Mau": ["Maunath Bhanjan", "Ghosi", "Muhammadabad Gohna", "Madhuban"],
            "Meerut": ["Meerut", "Sardhana", "Mawana"],
            "Mirzapur": ["Mirzapur", "Lalganj", "Marihan", "Chunar"],
            "Moradabad": ["Moradabad", "Bilari", "Thakurdwara", "Kanth"],
            "Muzaffarnagar": ["Muzaffarnagar", "Budhana", "Khatauli", "Jansath"],
            "Pilibhit": ["Pilibhit", "Bisalpur", "Puranpur", "Kalinagar", "Amariya"],
            "Pratapgarh": ["Pratapgarh", "Patti", "Kunda", "Lalganj", "Raniganj"],
            "Raebareli": ["Raebareli", "Lalganj", "Dalmau", "Maharajganj", "Tiloi", "Unchahar", "Salon"],
            "Rampur": ["Rampur", "Bilaspur", "Milak", "Shahabad", "Suar", "Tanda"],
            "Saharanpur": ["Saharanpur", "Deoband", "Nakur", "Behat", "Rampur Maniharan"],
            "Sambhal": ["Sambhal", "Chandausi", "Gunnaur"],
            "Sant Kabir Nagar": ["Khalilabad", "Mehdawal", "Dhanghata"],
            "Shahjahanpur": ["Shahjahanpur", "Powayan", "Tilhar", "Jalalabad"],
            "Shamli": ["Shamli", "Kairana", "Un"],
            "Shravasti": ["Bhinga", "Ikauna"],
            "Siddharthnagar": ["Naugarh", "Shohratgarh", "Bansi", "Itwa", "Domariyaganj"],
            "Sitapur": ["Sitapur", "Biswan", "Mishrikh", "Laharpur", "Mahmoodabad", "Sidhauli"],
            "Sonbhadra": ["Robertsganj", "Ghorawal", "Duddhi", "Obra"],
            "Sultanpur": ["Sadar", "Jaisinghpur", "Lambhua", "Kadipur"],
            "Unnao": ["Unnao", "Hasanganj", "Safipur", "Purwa", "Bighapur", "Bangarmau"],
            "Varanasi": ["Sadar", "Pindra", "Rajatalab"]
        };
        // Fallback for others: Just "Sadar" + District Name


        const districtInput = document.getElementById('work_district');
        const blockSelect = document.getElementById('work_block');
        const tehsilSelect = document.getElementById('work_tahsil');

        window.updateBlocksByDistrict = function () {
            const districtRaw = districtInput.value;
            // Extract just the name if it has Hindi (e.g. "Agra (आगरा)" -> "Agra")
            // But our keys are just "Agra".
            // The datalist has values like "Agra (आगरा)".

            // Fix: Split by " ("
            const distName = districtRaw.split(' (')[0].trim();

            // 1. Populate Blocks
            blockSelect.innerHTML = '<option value="">-- ब्लॉक चुनें --</option>';
            if (blockData[distName]) {
                blockData[distName].forEach(block => {
                    const opt = document.createElement('option');
                    opt.value = block;
                    opt.innerText = block;
                    blockSelect.appendChild(opt);
                });
            } else {
                blockSelect.innerHTML = '<option value="">Block data not found</option>';
            }

            // 2. Populate Tehsils
            tehsilSelect.innerHTML = '<option value="">-- तहसील चुनें --</option>';
            if (tehsilData[distName]) {
                tehsilData[distName].forEach(tehsil => {
                    const opt = document.createElement('option');
                    opt.value = tehsil;
                    opt.innerText = tehsil;
                    tehsilSelect.appendChild(opt);
                });
            } else {
                // Generic Fallback if data missing
                const opt = document.createElement('option');
                opt.value = distName + " Sadar";
                opt.innerText = distName + " Sadar (Default)";
                tehsilSelect.appendChild(opt);
            }
        };

        // --- DUPLICATE LOGIC FOR HOME DISTRICT ---
        const hDistrictInput = document.getElementById('home_district');
        const hBlockSelect = document.getElementById('home_block');
        const hTehsilSelect = document.getElementById('home_tahsil');

        window.updateHomeBlocksByDistrict = function () {
            const districtRaw = hDistrictInput.value;
            const distName = districtRaw.split(' (')[0].trim();

            // 1. Populate Blocks
            hBlockSelect.innerHTML = '<option value="">-- ब्लॉक चुनें --</option>';
            if (blockData[distName]) {
                blockData[distName].forEach(block => {
                    const opt = document.createElement('option');
                    opt.value = block;
                    opt.innerText = block;
                    hBlockSelect.appendChild(opt);
                });
            } else {
                hBlockSelect.innerHTML = '<option value="">Block data not found</option>';
            }

            // 2. Populate Tehsils
            hTehsilSelect.innerHTML = '<option value="">-- तहसील चुनें --</option>';
            if (tehsilData[distName]) {
                tehsilData[distName].forEach(tehsil => {
                    const opt = document.createElement('option');
                    opt.value = tehsil;
                    opt.innerText = tehsil;
                    hTehsilSelect.appendChild(opt);
                });
            } else {
                const opt = document.createElement('option');
                opt.value = distName + " Sadar";
                opt.innerText = distName + " Sadar (Default)";
                hTehsilSelect.appendChild(opt);
            }
        };
        const photoInput = document.getElementById('photo');
        const photoPreview = document.getElementById('photo-preview');
        const photoPlaceholder = document.getElementById('photo-placeholder');
        if (photoInput) {
            photoInput.addEventListener('change', function (e) {
                const file = e.target.files[0];
                if (file) {
                    // Basic size check (1MB)
                    if (file.size > 1024 * 1024) {
                        alert("फोटो का साइज 1MB से कम होना चाहिए।");
                        this.value = "";
                        photoPreview.style.display = "none";
                        photoPlaceholder.style.display = "block";
                        photoBase64 = "";
                        return;
                    }

                    const reader = new FileReader();
                    reader.onload = function (event) {
                        photoBase64 = event.target.result;
                        photoPreview.src = photoBase64;
                        photoPreview.style.display = "block";
                        photoPlaceholder.style.display = "none";
                    };
                    reader.readAsDataURL(file);
                } else {
                    photoPreview.style.display = "none";
                    photoPlaceholder.style.display = "block";
                    photoBase64 = "";
                }
            });
        }

        // --- SIGNATURE HANDLE ---
        const sigInput = document.getElementById('signature');
        const sigPreview = document.getElementById('signature-preview');
        const sigPlaceholder = document.getElementById('signature-placeholder');
        if (sigInput) {
            sigInput.addEventListener('change', function (e) {
                const file = e.target.files[0];
                if (file) {
                    if (file.size > 512 * 1024) { // 500KB limit for signature
                        alert("हस्ताक्षर का साइज 500KB से कम होना चाहिए।");
                        this.value = "";
                        sigPreview.style.display = 'none';
                        sigPlaceholder.style.display = 'block';
                        sigBase64 = "";
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        sigPreview.src = e.target.result;
                        sigPreview.style.display = 'block';
                        sigPlaceholder.style.display = 'none';
                        sigBase64 = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }

        // Conditional Address Enabling
        const homeDistrict = document.getElementById('home_district');
        const homeAddressGroup = document.getElementById('home_address_group');
        const workDistrict = document.getElementById('work_district');
        const workAddressGroup = document.getElementById('work_address_group');

        function toggleAddressField(districtInput, addressGroup) {
            if (districtInput && addressGroup) {
                const val = districtInput.value.trim();
                const isVisible = val !== "";
                addressGroup.style.display = isVisible ? "block" : "none";

                // Dynamically manage required attribute
                const textarea = addressGroup.querySelector('textarea');
                if (textarea) {
                    textarea.required = isVisible;
                }
            }
        }

        if (homeDistrict && homeAddressGroup) {
            homeDistrict.addEventListener('input', () => toggleAddressField(homeDistrict, homeAddressGroup));
            homeDistrict.addEventListener('change', () => toggleAddressField(homeDistrict, homeAddressGroup));
            toggleAddressField(homeDistrict, homeAddressGroup);
        }
        if (workDistrict && workAddressGroup) {
            workDistrict.addEventListener('input', () => toggleAddressField(workDistrict, workAddressGroup));
            workDistrict.addEventListener('change', () => toggleAddressField(workDistrict, workAddressGroup));
            toggleAddressField(workDistrict, workAddressGroup);
        }


        // --- Dynamic Post Filtering based on Department --- //
        const departmentInput = document.getElementById('department');
        const postInput = document.getElementById('post');
        const postList = document.getElementById('post_list');

        // Department to Job Roles Mapping
        const deptPostMap = {
            "Medical Health (चिकित्सा एवं स्वास्थ्य)": [
                "Ward Boy (वार्ड बॉय)", "Nurse (नर्स)", "Lab Technician (लैब टेक्नीशियन)",
                "Sweeper (सफाई कर्मचारी)", "Data Entry Operator (डाटा एंट्री ऑपरेटर)", "Computer Operator (कंप्यूटर ऑपरेटर)", "Helper (हेल्पर)"
            ],
            "Basic Education (बेसिक शिक्षा)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Data Entry Operator (डाटा एंट्री ऑपरेटर)",
                "Junior Assistant (कनिष्ठ सहायक)", "Peon (चपरासी)", "Sweeper (सफाई कर्मचारी)", "Instructor (अनुदेशक)"
            ],
            "Secondary Education (माध्यमिक शिक्षा)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Junior Assistant (कनिष्ठ सहायक)", "Peon (चपरासी)"
            ],
            "Police (पुलिस विभाग)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Sweeper (सफाई कर्मचारी)", "Cook (रसोइया)", "Follower (फॉलोअर)"
            ],
            "Transport (परिवहन निगम)": [
                "Driver (वाहन चालक)", "Conductor (परिचालक)", "Mechanic (मैकेनिक)", "Computer Operator (कंप्यूटर ऑपरेटर)"
            ],
            "Electricity (विद्युत विभाग)": [
                "Lineman (लाइनमैन)", "Meter Reader (मीटर रीडर)", "Electrician (इलेक्ट्रीशियन)", "SSO (एसएसओ)", "Computer Operator (कंप्यूटर ऑपरेटर)"
            ],
            "Nagar Nigam (नगर निगम/पालिका)": [
                "Sweeper (सफाई कर्मचारी)", "Driver (वाहन चालक)", "Computer Operator (कंप्यूटर ऑपरेटर)", "Supervisor (सुपरवाइजर)"
            ],
            "PWD (लोक निर्माण विभाग)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Junior Assistant (कनिष्ठ सहायक)", "Peon (चपरासी)", "Mate (मेट)"
            ],
            "Irrigation (सिंचाई विभाग)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Junior Assistant (कनिष्ठ सहायक)", "Seenchpal (सींचपाल)", "Tubewell Operator (नलकूप चालक)"
            ],
            "Social Welfare (समाज कल्याण)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Junior Assistant (कनिष्ठ सहायक)", "Supervisor (सुपरवाइजर)"
            ],
            "Agriculture (कृषि विभाग)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Technical Assistant (प्राविधिक सहायक)", "Peon (चपरासी)"
            ],
            "Panchayati Raj (पंचायती राज)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Panchayat Sahayak (पंचायत सहायक)", "Safai Karmi (सफाई कर्मी)"
            ],
            "Rural Development (ग्राम्य विकास)": [
                "Computer Operator (कंप्यूटर ऑपरेटर)", "Gram Rozgar Sevak (ग्राम रोजगार सेवक)"
            ]
        };

        const allPosts = [
            "Computer Operator (कंप्यूटर ऑपरेटर)", "Data Entry Operator (डाटा एंट्री ऑपरेटर)",
            "Junior Assistant (कनिष्ठ सहायक)", "Driver (वाहन चालक)", "Conductor (परिचालक)",
            "Peon (चपरासी)", "Sweeper (सफाई कर्मचारी)", "Ward Boy (वार्ड बॉय)", "Nurse (नर्स)",
            "Lab Technician (लैब टेक्नीशियन)", "Electrician (इलेक्ट्रीशियन)", "Lineman (लाइनमैन)",
            "Meter Reader (मीटर रीडर)", "Security Guard (सुरक्षा गार्ड)", "Helper (हेल्पर)",
            "Supervisor (सुपरवाइजर)", "Other (अन्य)"
        ];

        if (departmentInput && postList) {
            departmentInput.addEventListener('input', () => {
                const selectedDept = departmentInput.value;
                postInput.value = ""; // Clear selected post when department changes

                // Determine which posts to show
                let postsToShow = [];
                if (deptPostMap[selectedDept]) {
                    postsToShow = deptPostMap[selectedDept];
                    // Always add 'Other'
                    if (!postsToShow.includes("Other (अन्य)")) postsToShow.push("Other (अन्य)");
                } else {
                    // Default to all posts if valid dept not matched (or empty)
                    postsToShow = allPosts;
                }

                // Rebuild Datalist
                postList.innerHTML = '';
                postsToShow.forEach(post => {
                    const option = document.createElement('option');
                    option.value = post;
                    postList.appendChild(option);
                });
            });
        }

        regForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Submit button clicked");

            try {
                // Get form inputs
                const name = document.getElementById('name').value;
                const fatherName = document.getElementById('fname').value;
                const dob = document.getElementById('dob').value;
                const mobile = document.getElementById('mobile').value;
                const homeDistrict = document.getElementById('home_district').value;
                const homeAddress = document.getElementById('home_address').value;
                const workDistrict = document.getElementById('work_district').value;
                const workAddress = document.getElementById('work_address').value;
                const department = document.getElementById('department').value;
                const post = document.getElementById('post').value;
                const password = document.getElementById('regPassword').value;
                const membershipPlan = document.getElementById('membership_plan') ? document.getElementById('membership_plan').value : 'Yearly'; // Default if missing
                const membershipAmount = membershipPlan === 'Lifetime' ? 699 : 299;

                // --- FIRESTORE INTEGRATION ---
                // Validate (Basic check)
                if (name && mobile && department && post && password) {
                    // Create Member Object
                    const memberData = {
                        id: Date.now(), // timestamp as ID helper
                        name: name,
                        fatherName: fatherName,
                        father_name: fatherName,
                        dob: dob,
                        mobile: mobile,
                        password: password,
                        homeDistrict: homeDistrict,
                        home_district: homeDistrict,
                        home_tahsil: document.getElementById('home_tahsil') ? document.getElementById('home_tahsil').value.trim() : '',
                        home_block: document.getElementById('home_block') ? document.getElementById('home_block').value.trim() : '',
                        homeAddress: homeAddress,
                        home_address: homeAddress,
                        workDistrict: workDistrict,
                        work_district: workDistrict,
                        work_tahsil: document.getElementById('work_tahsil') ? document.getElementById('work_tahsil').value.trim() : '',
                        work_block: document.getElementById('work_block') ? document.getElementById('work_block').value.trim() : '',
                        workAddress: workAddress,
                        work_address: workAddress,
                        department: department,
                        post: post,
                        photo: photoBase64 || "",
                        signature: sigBase64 || "",
                        status: 'Pending',
                        membership_plan: membershipPlan,
                        membership_amount: membershipAmount,
                        date: new Date().toLocaleDateString('hi-IN'), // Display String
                        createdAt: firebase.firestore.FieldValue.serverTimestamp() // Server Timestamp for sorting
                    };

                    // Show loading state
                    const submitBtn = regForm.querySelector('button[type="submit"]');
                    const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';
                    if (submitBtn) {
                        submitBtn.innerText = "Processing...";
                        submitBtn.disabled = true;
                    }

                    // Save to Firestore 'members' collection
                    // Ensure db is defined
                    if (!window.db) {
                        throw new Error("Database connection not established. Please refresh the page.");
                    }

                    await window.db.collection("members").add(memberData);

                    console.log("Document written successfully");
                    alert(`बधाई हो ${name}! आपका रजिस्ट्रेशन सफल रहा।\n\nआपका डेटा सर्वर पर सुरक्षित कर लिया गया है।\nअब आप लॉगिन कर सकते हैं।`);
                    window.location.reload();

                } else {
                    alert('कृपया सभी आवश्यक जानकारी भरें।');
                }
            } catch (err) {
                console.error("Registration Error: ", err);
                alert("Error during registration: " + err.message);
                const submitBtn = regForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.innerText = "रजिस्टर करें";
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // --- MEMBER AUTHENTICATION LOGIC --- //

    // 1. Handle Member Login (login.html)
    const memberForm = document.getElementById('memberLoginForm');
    if (memberForm) {
        memberForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const mobile = document.getElementById('memberMobile').value.trim();
            const pass = document.getElementById('memberPass').value.trim();

            if (mobile && pass) {
                const loginBtn = memberForm.querySelector('button');
                if (loginBtn) loginBtn.innerText = "Checking...";

                // Query Firestore for member with matching mobile
                db.collection("members").where("mobile", "==", mobile).get()
                    .then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            alert('मोबाइल नंबर पंजीकृत नहीं है ');
                            if (loginBtn) loginBtn.innerText = "Login";
                            return;
                        }

                        let found = false;
                        querySnapshot.forEach((doc) => {
                            const member = doc.data();
                            // Check password (in real app, use hashing!)
                            if (member.password === pass) {
                                found = true;
                                // Save minimal session info to LocalStorage (ok for session state)
                                // But we load actual data from DB on dashboard
                                localStorage.setItem('up_sangh_current_member', JSON.stringify(member)); // Keep this for session mgmt for now
                                localStorage.setItem('up_sangh_member_doc_id', doc.id); // Save Doc ID for updates

                                alert('लॉगिन सफल (Login Successful)!');
                                window.location.replace('member_dashboard.html');
                            }
                        });

                        if (!found) {
                            alert('पासवर्ड गलत है (Invalid Password)');
                            if (loginBtn) loginBtn.innerText = "Login";
                        }
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                        alert("Login Error: " + error.message);
                        if (loginBtn) loginBtn.innerText = "Login";
                    });
            }
        });

        // Member Password Toggle
        const mToggleBtn = document.getElementById('toggleMemberPass');
        const mShowBox = document.getElementById('showMemberPassCheck');
        const mPassIn = document.getElementById('memberPass');

        if (mPassIn && (mToggleBtn || mShowBox)) {
            const updateUI = (isText) => {
                mPassIn.type = isText ? 'text' : 'password';
                if (mToggleBtn) mToggleBtn.className = isText ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
                if (mShowBox) mShowBox.checked = isText;
            };

            if (mToggleBtn) mToggleBtn.addEventListener('click', () => updateUI(mPassIn.type === 'password'));
            if (mShowBox) mShowBox.addEventListener('change', (e) => updateUI(e.target.checked));
        }
    }

    // 2. Protect Member Dashboard
    if (window.location.pathname.includes('member_dashboard.html')) {
        const currentMember = localStorage.getItem('up_sangh_current_member');
        if (!currentMember) {
            window.location.replace('login.html');
        } else {
            window.logoutMember = function () {
                if (confirm('लॉगआउट करना चाहते हैं?')) {
                    localStorage.removeItem('up_sangh_current_member');
                    localStorage.removeItem('up_sangh_active_section');
                    window.location.replace('login.html');
                }
            }
        }
    }

    // --- ADMIN AUTHENTICATION LOGIC (ROBUST) --- //

    // Login Configuration
    const AUTH_KEY = 'up_sangh_admin_token';
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "Sangh@2025";

    // 1. Handle Login Page (login.html or admin_login.html fallback)
    const adminForm = document.getElementById('mainAdminLoginForm') || document.getElementById('loginForm');

    if (adminForm) {
        // Auto-clear session on load if we are on login page
        // But since login.html also has Member login, we should only clear if explicitly asked or maybe not enforce clear?
        // User asked for "Admin Login inside Login Page". 
        // Let's clear token to fail-safe.
        // localStorage.removeItem(AUTH_KEY); // Actually, don't auto-clear heavily on shared page, but for admin safety let's do it if they try to login.

        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Detect which inputs are being used (login.html vs admin_login.html)
            const userIn = document.getElementById('adminUser') || document.getElementById('username');
            const passIn = document.getElementById('adminPass') || document.getElementById('password');

            const user = userIn.value.trim();
            const pass = passIn.value.trim();

            const btn = adminForm.querySelector('button');

            // 1. Check ADMIN
            if (user === ADMIN_USER && pass === ADMIN_PASS) {
                // Set persistent token
                localStorage.setItem(AUTH_KEY, Date.now().toString());
                // Clear any previous officer session to ensure Super Admin sees everything
                localStorage.removeItem('up_sangh_current_officer_session');
                localStorage.removeItem('up_sangh_officer_token');

                if (btn) btn.innerText = "Admin Login...";
                setTimeout(() => window.location.replace('admin_dashboard.html'), 500);
            }
            // 2. Check OFFICERS (Firestore)
            else {
                if (btn) btn.innerText = "Verifying...";

                db.collection("officers").where("mobile", "==", user).get()
                    .then((querySnapshot) => {
                        if (querySnapshot.empty) {
                            alert('गलत यूज़रनेम या पासवर्ड (Invalid Credentials)');
                            if (btn) btn.innerText = "Login";
                            return;
                        }

                        let found = false;
                        querySnapshot.forEach((doc) => {
                            const officer = doc.data();
                            officer.firestoreId = doc.id; // Save ID

                            if (officer.password === pass) {
                                found = true;

                                // Check Approval Status
                                if (officer.status && officer.status !== 'Approved') {
                                    alert(`आपका अकाउंट अभी सत्यापित (Verify) नहीं हुआ है। कृपया मुख्य एडमिन से संपर्क करें।\nStatus: ${officer.status}`);
                                    if (btn) btn.innerText = "Login";
                                    return;
                                }

                                // Officer Login Success
                                localStorage.setItem('up_sangh_officer_token', Date.now().toString());
                                localStorage.setItem('up_sangh_current_officer_session', JSON.stringify(officer));

                                if (btn) btn.innerText = "Redirecting...";

                                setTimeout(() => {
                                    window.location.replace('officer_dashboard.html');
                                }, 500);
                            }
                        });

                        if (!found) {
                            alert('गलत यूज़रनेम या पासवर्ड (Invalid Credentials)');
                            if (btn) btn.innerText = "Login";
                        }
                    })
                    .catch((error) => {
                        console.error("Login Error", error);
                        alert("Login error: " + error.message);
                        if (btn) btn.innerText = "Login";
                    });
            }
        });

        // Password Toggle Logic
        const toggleBtn = document.getElementById('toggleAdminPass') || document.getElementById('togglePassword');
        const showBox = document.getElementById('showAdminPassCheck') || document.getElementById('showPassCheckbox');
        const passIn = document.getElementById('adminPass') || document.getElementById('password');

        if (passIn && (toggleBtn || showBox)) {
            const updateUI = (isText) => {
                passIn.type = isText ? 'text' : 'password';
                if (toggleBtn) toggleBtn.className = isText ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
                if (showBox) showBox.checked = isText;
            };

            if (toggleBtn) toggleBtn.addEventListener('click', () => updateUI(passIn.type === 'password'));
            if (showBox) showBox.addEventListener('change', (e) => updateUI(e.target.checked));
        }
    }

    // 2. Protect Admin Dashboard
    if (window.location.pathname.includes('admin_dashboard.html')) {
        const token = localStorage.getItem(AUTH_KEY);
        if (!token) {
            // Not logged in
            document.body.style.display = 'none'; // Hide content immediately
            window.location.replace('login.html'); // Redirect to main login page now
        } else {
            // Logged in
            window.logoutAdmin = function () {
                if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
                    localStorage.removeItem(AUTH_KEY);
                    window.location.replace('login.html');
                }
            };
        }
    }

    // 3. Logout Functionality (Global)
    window.logoutAdmin = function () {
        if (confirm('क्या आप लॉगआउट करना चाहते हैं?')) {
            localStorage.removeItem('up_sangh_admin_token');
            localStorage.removeItem('up_sangh_current_officer_session');
            localStorage.removeItem('up_sangh_officer_token');
            localStorage.removeItem('up_sangh_active_section_admin');
            localStorage.removeItem('up_sangh_active_section_officer');
            sessionStorage.removeItem('admin_logged_in');
            window.location.replace('login.html');
        }
    };

    // Helper to safely parse JSON
    window.safeJsonParse = function (key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error("Data parse error", e);
            return [];
        }
    };

    // Handle Issue Form
    const issueForm = document.getElementById('issueForm');
    if (issueForm) {
        issueForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Data
            const name = document.getElementById('name') ? document.getElementById('name').value : 'Anonymous';
            const mobile = document.getElementById('mobile') ? document.getElementById('mobile').value : '';
            const subject = document.getElementById('subject') ? document.getElementById('subject').value : 'General Issue';
            const message = document.getElementById('message').value;

            if (message) {
                const newIssue = {
                    id: Date.now(),
                    name,
                    mobile,
                    subject,
                    message,
                    date: new Date().toLocaleDateString('hi-IN')
                };

                // Save to LocalStorage
                // Use the safe helper if available, else manual try-catch
                let issues = [];
                try {
                    issues = JSON.parse(localStorage.getItem('up_sangh_issues')) || [];
                } catch (e) { issues = []; }

                issues.push(newIssue);
                localStorage.setItem('up_sangh_issues', JSON.stringify(issues));

                alert('आपकी समस्या दर्ज कर ली गई है। धन्यवाद। (Issue Submitted)');
                issueForm.reset();
            } else {
                alert('कृपया विवरण लिखें।');
            }
        });
    }

    // --- PUBLIC PAGE: RENDER OFFICERS (members.html) --- //
    const officerGrid = document.querySelector('.cards-grid'); // Ensure this class exists in members.html
    if (officerGrid && window.location.pathname.includes('members.html')) {
        // Load officers from Admin Storage
        const allOfficers = JSON.parse(localStorage.getItem('up_sangh_officers')) || [];
        const officers = allOfficers.filter(o => (o.status || 'Approved') === 'Approved');

        // If empty, maybe show default or placeholder?
        // keeping existing static HTML if no dynamic data? 
        // Actually user wants control, so we should overwrite if data exists (or just append)
        // Let's overwite for full control

        if (officers.length > 0) {
            officerGrid.innerHTML = ''; // Clear static defaults
            officers.forEach(off => {
                officerGrid.innerHTML += `
                    <div class="profile-card">
                        <img src="https://via.placeholder.com/100" alt="Member" class="profile-img">
                        <h3>${off.name}</h3>
                        <p class="post">${off.post}</p>
                        <p>जिला: ${off.district || 'N/A'}</p>
                        ${off.mobile ? `<p><i class="fa-solid fa-phone"></i> ${off.mobile}</p>` : ''}
                    </div>
                `;
            });
        }
    }

    // Dynamic Departments Loading (Simulation)
    const deptContainer = document.querySelector('.dept-list');
    if (deptContainer) {
        const departments = [
            { name: "बेसिक शिक्षा विभाग", type: "डाटा एंट्री / अनुदेशक" },
            { name: "चिकित्सा एवं स्वास्थ्य विभाग", type: "वार्ड बॉय / नज़्स / अन्य" },
            { name: "नगर निगम", type: "सफाई कर्मचारी / ड्राइवर" },
            { name: "विद्युत विभाग", type: "लाइनमैन / मीटर रीडर" },
            { name: "परिवहन निगम", type: "संविदा चालक / परिचालक" }
        ];

        departments.forEach(dept => {
            const div = document.createElement('div');
            div.className = 'dept-item';
            div.innerHTML = `
                <h3><i class="fa-solid fa-building-user"></i> ${dept.name}</h3>
                <p><strong>कार्यक्षेत्र:</strong> ${dept.type}</p>
                <button class="btn-sm" style="margin-top:10px; padding:5px 10px; cursor:pointer;">नियम देखें</button>
            `;
            deptContainer.appendChild(div);
        });
    }

    // Accordion for Issues
    const acc = document.getElementsByClassName("accordion");
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }
    // --- EXPORT FUNCTIONALITY --- //

    window.downloadMembersPDF = function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const members = JSON.parse(localStorage.getItem('up_sangh_members')) || [];

        doc.setFont("helvetica", "bold");
        doc.text("All Registered Members List", 14, 15);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Total Members: ${members.length} | Date: ${new Date().toLocaleDateString()}`, 14, 22);

        const tableColumn = ["ID", "Name", "Mobile", "Father's Name", "District", "Dept", "Post"];
        const tableRows = [];

        members.forEach(m => {
            const memberData = [
                m.id || '-',
                m.name || '-',
                m.mobile || '-',
                m.fatherName || '-',
                m.homeDistrict || '-',
                m.department || '-',
                m.post || '-'
            ];
            tableRows.push(memberData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [41, 128, 185] }
        });

        doc.save(`Members_List_${Date.now()}.pdf`);
    };

    window.downloadMembersExcel = function () {
        const members = JSON.parse(localStorage.getItem('up_sangh_members')) || [];
        if (members.length === 0) { alert("No members to export."); return; }

        const worksheetData = members.map(m => ({
            "User ID": m.id,
            "Name": m.name,
            "Father Name": m.fatherName,
            "DOB": m.dob,
            "Mobile": m.mobile,
            "Home District": m.homeDistrict,
            "Home Address": m.homeAddress,
            "Work District": m.workDistrict,
            "Work Address": m.workAddress,
            "Department": m.department,
            "Post": m.post,
            "Status": m.status,
            "Reg Date": m.date
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(wb, ws, "Members");
        XLSX.writeFile(wb, `Members_List_${Date.now()}.xlsx`);
    };

    window.downloadOfficersPDF = function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('l'); // Landscape for more columns

        const officers = JSON.parse(localStorage.getItem('up_sangh_officers')) || [];

        doc.setFont("helvetica", "bold");
        doc.text("All Officers List", 14, 15);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Total Officers: ${officers.length} | Date: ${new Date().toLocaleDateString()}`, 14, 22);

        const tableColumn = ["Name", "Father Name", "Mobile", "Post", "Department", "Role", "Division", "District"];
        const tableRows = [];

        officers.forEach(o => {
            const officerData = [
                o.name || '-',
                o.fatherName || '-',
                o.mobile || '-',
                o.post || '-',
                o.vibhag || '-',
                o.role || '-',
                o.division || '-',
                o.district || '-'
            ];
            tableRows.push(officerData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            theme: 'striped',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [220, 53, 69] }
        });

        doc.save(`Officers_List_${Date.now()}.pdf`);
    };

    window.downloadOfficersExcel = function () {
        const officers = JSON.parse(localStorage.getItem('up_sangh_officers')) || [];
        if (officers.length === 0) { alert("No officers to export."); return; }

        const worksheetData = officers.map(o => ({
            "Name": o.name,
            "Father Name": o.fatherName,
            "Mobile": o.mobile,
            "Department": o.vibhag,
            "Post": o.post,
            "Role": o.role,
            "Division": o.division,
            "District": o.district,
            "Block": o.block,
            "Address": o.address,
            "Status": o.status
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(wb, ws, "Officers");
        XLSX.writeFile(wb, `Officers_List_${Date.now()}.xlsx`);
    };

});

// --- ADMIN DASHBOARD MISSING HELPERS ---
// These functions are called by the Admin Dashboard navigation but were missing.
// We alias them to the main loader which handles all data rendering.
window.loadMembers = function () { if (window.loadDashboardData) window.loadDashboardData(); };
window.loadOfficers = function () { if (window.loadDashboardData) window.loadDashboardData(); };
window.loadIssues = function () { if (window.loadDashboardData) window.loadDashboardData(); };

