import React from 'react';
import { CheckCircleIcon, TrendingUpIcon, UsersIcon, GlobeIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
export const AboutUsPage = () => {
  const teamMembers = [{
    name: 'Michael Roberts',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    bio: 'Former real estate investment banker with 15+ years of experience managing $2B+ in property acquisitions.',
    linkedin: '#'
  }
  // ... other team members
  ];
  const stats = [{
    value: '$32.4M',
    label: 'Assets Under Management' 
  }, { 
    value: '3,200+',
    label: 'Active Investors'
  }, {
    value: '48',
    label: 'Properties in Portfolio'
  }, {
    value: '8.7%',
    label: 'Average Annual Returns'
  }];
  const values = [{
    title: 'Transparency',
    description: 'We provide complete visibility into all aspects of your investments, from property performance to fee structures.'
  }, {
    title: 'Excellence',
    description: 'We maintain the highest standards in property selection, management, and investor relations.'
  }, {
    title: 'Innovation',
    description: 'We continuously improve our platform and investment offerings to deliver better results for our investors.'
  }, {
    title: 'Integrity',
    description: 'We always act in the best interests of our investors, maintaining the highest ethical standards.'
  }];
  return <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80"></div>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{
        backgroundImage: "url('/images/Ceo.png')"
      }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About RealtyVest
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              We're on a mission to democratize access to institutional-quality
              real estate investments.
            </p>
          </div>
        </div>
      </div>
      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Our Story
            </h2>
            <p className="text-gray-600 mb-6">
              RealtyVest was founded in 2018 with a clear vision: to break down
              the barriers that have historically kept individual investors from
              accessing high-quality real estate investments. Our founder,
              Michael Roberts, spent 15 years in real estate investment banking,
              where he saw firsthand how institutional investors and
              high-net-worth individuals benefited from real estate investments
              that were inaccessible to most people.
            </p>
            <p className="text-gray-600 mb-6">
              Recognizing that technology could democratize access to these
              opportunities, Michael assembled a team of real estate, finance,
              and technology experts to build a platform that would allow anyone
              to invest in institutional-quality properties with as little as
              $10,000.
            </p>
            <p className="text-gray-600">
              Since our launch, we've helped over 3,200 investors build
              diversified real estate portfolios, with properties across 18
              states. Our investors have earned an average annual return of
              8.7%, and we're just getting started.
            </p>
          </div>
        </div>
      </section>
      {/* Stats */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => <div key={index} className="p-6">
                <div className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              To empower individuals to build wealth through real estate by
              providing access to institutional-quality investments, education,
              and tools.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
              <div className="flex flex-col items-center md:items-start">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-full mb-4">
                  <TrendingUpIcon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Access</h3>
                <p className="text-gray-600">
                  Providing opportunities previously available only to
                  institutional investors and the ultra-wealthy.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-full mb-4">
                  <UsersIcon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Education
                </h3>
                <p className="text-gray-600">
                  Empowering investors with the knowledge they need to make
                  informed investment decisions.
                </p>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-full mb-4">
                  <GlobeIcon size={24} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Impact</h3>
                <p className="text-gray-600">
                  Creating positive economic and social impact in the
                  communities where our properties are located.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <CheckCircleIcon size={24} className="text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">
                    {value.title}
                  </h3>
                </div>
                <p className="text-gray-600">{value.description}</p>
              </div>)}
          </div>
        </div>
      </section>
      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Leadership Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experienced professionals who are making real estate
              investing accessible to everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <a href={member.linkedin} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <LinkedinIcon size={18} className="mr-2" />
                    LinkedIn Profile
                  </a>
                </div>
              </div>)}
          </div>
        </div>
      </section>
      {/* Join Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-blue-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8">
              We're always looking for talented individuals who are passionate
              about real estate, technology, and making investing accessible to
              everyone.
            </p>
            <button className="px-8 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-lg transition font-medium">
              View Open Positions
            </button>
          </div>
        </div>
      </section>
    </div>;
};