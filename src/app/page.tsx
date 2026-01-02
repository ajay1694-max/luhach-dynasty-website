import Link from 'next/link';
import Image from 'next/image';

// Hero Image Gallery Component
function HeroGallery() {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-800 p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 max-w-7xl mx-auto h-[300px] md:h-[400px]">
        {/* Card 1 - Religious Heritage */}
        <div className="relative overflow-hidden rounded-lg group h-full image-zoom shadow-md border border-white/10">
          <img
            src="/images/asset_1767153109876_694.jpg"
            alt="Religious Heritage"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
            <div>
              <p className="text-white font-bold text-xl md:text-2xl shadow-text-lg hindi-text tracking-wide">धार्मिक धरोहर</p>
              <div className="h-1 w-12 bg-[#f59e0b] mt-2 rounded-full transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
            </div>
          </div>
        </div>

        {/* Card 2 - Community Gathering */}
        <div className="relative overflow-hidden rounded-lg group h-full md:col-span-1 image-zoom shadow-md border border-white/10">
          <img
            src="/images/asset_1767152786130_245.jpeg"
            alt="Community Gathering"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
            <div>
              <p className="text-white font-bold text-xl md:text-2xl shadow-text-lg hindi-text tracking-wide">सामुदायिक सभा</p>
              <div className="h-1 w-12 bg-[#f59e0b] mt-2 rounded-full transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
            </div>
          </div>
        </div>

        {/* Card 3 - Our Ancestors */}
        <div className="relative overflow-hidden rounded-lg group h-full image-zoom shadow-md border border-white/10">
          <img
            src="/images/asset_1767152868080_152.jpg"
            alt="Our Ancestors"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
            <div>
              <p className="text-white font-bold text-xl md:text-2xl shadow-text-lg hindi-text tracking-wide">हमारे पूर्वज</p>
              <div className="h-1 w-12 bg-[#f59e0b] mt-2 rounded-full transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// About Section
function AboutSection() {
  return (
    <section className="py-16 px-4 bg-surface" id="about">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] dark:text-white mb-2 pb-2 border-b-4 border-[#f59e0b] inline-block hindi-text">
            हमारे बारे में
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Our History &amp; Legacy</p>
        </div>

        <div className="space-y-4 text-justify text-foreground leading-relaxed">
          <p className="drop-cap hindi-text">
            लुहाच वंश मेहनतकश जाट समुदाय का एक गोत्र है। लुहाच वंश का इतिहास छठी शताब्दी लगभग 1500 साल पुराना है। इतिहासकारों के अनुसार इसकी उत्पत्ति अग्निवंशी राजपूत से हुई है यह गोत्र अग्निवंश में वैदिककालीन जाट गोत्र है। इनका निवास स्थान राजस्थान के आबूगढ़ क्षेत्र में था।
          </p>

          <p className="hindi-text">
            लुहाच वंश के लोग प्राचीन काल से ही युद्ध कला में निपुण रहे हैं जो अपनी वीरता एवं बलिदान के लिए जाने जाते हैं। इनका जीविकोपार्जन हेतु मुख्य व्यवसाय खेती और पशुपालन था। वर्तमान में लुहाच वंश के अत्यधिक फैलाव होने के कारण और समयानुसार कुछ लोगों ने शहरी नौकरियों के पक्ष में कृषि को छोड़ दिया।
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-primary my-6">
            <p className="italic font-medium hindi-text">
              "रिटायर्ड कर्नल कर्मबीर सिंह लुहाच जी की भारतीय सेना में लगभग 40 वर्ष अपनी सेवा देने के उपरान्त 30 अप्रैल 2019 को सेवानिवृत्त होने के बाद, लुहाच वंश के इतिहास और वंश के फैलाव का पता लगाने की एक मुहीम की शुरुआत की।"
            </p>
          </div>

          <p className="hindi-text">
            इसी मुहीम के फलस्वरूप आज उत्तरी भारत में हरियाणा, राजस्थान व उत्तर प्रदेश के 46 गांवों में लुहाच गोत्र के लोग रहते हैं। फिर सोशल मीडिया की मदद से एक ग्रुप बनाकर सभी गांवों के लुहाच भाइयों को एक मंच पर एकत्रित किया गया। 14 फरवरी 2021 को एक विशाल लुहाच मिलन समारोह का आयोजन किया गया जिसमें लगभग 30 गांवों से 500 लुहाच भाई सम्मिलित हुए।
          </p>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/history"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span className="hindi-text">पूरा इतिहास पढ़ें</span>
            <span>(Read Full History)</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Genealogy Preview Section
function GenealogySection() {
  return (
    <section className="py-16 px-4 bg-background border-t dark:border-slate-700" id="genealogy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] dark:text-white mb-2 hindi-text">वंशावली चार्ट</h2>
          <div className="section-divider"></div>
          <p className="text-slate-500 dark:text-slate-400 mt-4">Family Tree &amp; Village Distribution</p>
        </div>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col items-center space-y-8 py-8">
            {/* Root */}
            <div className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-xl shadow-md hindi-text">
              लुहाच परिवार
            </div>

            {/* Branches */}
            <div className="w-1 h-8 bg-slate-300"></div>

            <div className="flex flex-wrap justify-center gap-6 lg:gap-16">
              {/* Haryana */}
              <div className="flex flex-col items-center">
                <div className="bg-green-100 dark:bg-green-900 border-2 border-green-500 text-green-800 dark:text-green-200 px-6 py-2 rounded-lg font-bold mb-4 hindi-text">
                  हरियाणा
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-center">
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">रिटोली</span>
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">मदीना</span>
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">खेड़ी मेहम</span>
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">भड़ाना</span>
                </div>
              </div>

              {/* Nandha (Origin) */}
              <div className="flex flex-col items-center">
                <div className="bg-yellow-100 dark:bg-yellow-900 border-2 border-[#f59e0b] text-yellow-800 dark:text-yellow-200 px-8 py-3 rounded-lg font-bold text-lg shadow-sm hindi-text">
                  नांधा (मूल)
                </div>
              </div>

              {/* Uttar Pradesh */}
              <div className="flex flex-col items-center">
                <div className="bg-pink-100 dark:bg-pink-900 border-2 border-pink-500 text-pink-800 dark:text-pink-200 px-6 py-2 rounded-lg font-bold mb-4 hindi-text">
                  उत्तर प्रदेश
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-center">
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">सहारनपुर</span>
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">मुजफ्फरनगर</span>
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">बुलंदशहर</span>
                  <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">मेरठ</span>
                </div>
              </div>
            </div>

            {/* Rajasthan */}
            <div className="flex flex-col items-center pt-4">
              <div className="bg-orange-100 dark:bg-orange-900 border-2 border-orange-500 text-orange-800 dark:text-orange-200 px-6 py-2 rounded-lg font-bold mb-4 hindi-text">
                राजस्थान
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">झुंझुनू</span>
                <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">सीकर</span>
                <span className="bg-slate-100 dark:bg-slate-700 p-2 rounded hindi-text">जयपुर</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/vanshavali"
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hindi-text">पूरी वंशावली देखें</span>
            <span>(View Full Chart)</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Achievers Section (Bento Grid)
function AchieversSection() {
  const categories = [
    { icon: '🎓', label: 'Professor', labelHi: 'प्रोफेसर', color: 'blue' },
    { icon: '⚕️', label: 'Doctor', labelHi: 'डॉक्टर', color: 'green' },
    { icon: '🔧', label: 'Engineer', labelHi: 'इंजीनियर', color: 'yellow' },
    { icon: '⚖️', label: 'Lawyer', labelHi: 'वकील', color: 'slate' },
    { icon: '📊', label: "CA's", labelHi: 'सी.ए.', color: 'purple' },
    { icon: '🏢', label: 'Corporates', labelHi: 'कॉर्पोरेट', color: 'indigo' },
    { icon: '🎖️', label: 'Military', labelHi: 'सैनिक', color: 'orange' },
    { icon: '🏛️', label: 'Govt. Servant', labelHi: 'सरकारी', color: 'red' },
    { icon: '📢', label: 'Politician', labelHi: 'राजनेता', color: 'cyan' },
    { icon: '🏃', label: 'Sports', labelHi: 'खिलाड़ी', color: 'rose' },
    { icon: '🛡️', label: 'Police', labelHi: 'पुलिस', color: 'sky' },
    { icon: '👥', label: 'Other', labelHi: 'अन्य', color: 'gray' },
  ];

  return (
    <section className="py-16 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] mb-2 hindi-text">
            गौरवशाली सदस्य (Achievers)
          </h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={`/achievers?category=${cat.label.toLowerCase()}`}
              className="flex flex-col items-center p-4 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 transition-all hover:scale-105 cursor-pointer border border-slate-100 card-hover"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-3 text-3xl">
                {cat.icon}
              </div>
              <span className="font-semibold text-slate-700 text-sm text-center">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/achievers"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <span className="hindi-text">सभी गौरवशाली देखें</span>
            <span>(View All Achievers)</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Quick Stats Section
function StatsSection() {
  const stats = [
    { value: '46', labelHi: 'गांव', labelEn: 'Villages' },
    { value: '10,000+', labelHi: 'सदस्य', labelEn: 'Members' },
    { value: '40+', labelHi: 'पीढ़ियां', labelEn: 'Generations' },
    { value: '1500+', labelHi: 'वर्ष इतिहास', labelEn: 'Years Heritage' },
  ];

  return (
    <section className="py-12 px-4 bg-blue-50 text-[#1e3a8a] border-y border-blue-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.labelEn} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-[#f59e0b] mb-2">
                {stat.value}
              </div>
              <div className="text-[#1e3a8a] text-sm md:text-base">
                <span className="hindi-text">{stat.labelHi}</span>
                <span className="block text-xs opacity-75">({stat.labelEn})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function HomePage() {
  return (
    <>
      <HeroGallery />
      <AboutSection />
      <StatsSection />
      <GenealogySection />
      <AchieversSection />
    </>
  );
}
