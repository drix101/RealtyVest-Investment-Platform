import React from 'react';
import { SearchIcon, HomeIcon, BarChartIcon, DollarSignIcon, ClipboardCheckIcon, ShieldIcon, PieChartIcon, BriefcaseIcon } from 'lucide-react';
export const HowItWorksPage = () => {
  const steps = [{
    icon: <SearchIcon size={32} className="text-blue-600" />,
    title: 'Browse Properties',
    description: 'Start by exploring our curated selection of investment properties. Each listing includes detailed financial metrics, historical performance data, and comprehensive property information to help you make informed decisions.'
  }, {
    icon: <BarChartIcon size={32} className="text-blue-600" />,
    title: 'Analyze Performance',
    description: 'Dive deep into property analytics with our advanced tools. Review historical returns, occupancy rates, cash flow projections, and market trends. Compare properties side by side to find the best fit for your investment goals.'
  }, {
    icon: <ClipboardCheckIcon size={32} className="text-blue-600" />,
    title: 'Complete Due Diligence',
    description: 'Access comprehensive property reports, legal documentation, and inspection records. Our platform provides complete transparency so you can perform thorough due diligence before committing your investment.'
  }, {
    icon: <HomeIcon size={32} className="text-blue-600" />,
    title: 'Invest Securely',
    description: 'Choose your investment amount and complete your transaction through our secure platform. Our streamlined process makes it easy to invest in minutes, with investments starting as low as $10,000.'
  }, {
    icon: <ShieldIcon size={32} className="text-blue-600" />,
    title: 'Property Management',
    description: "Sit back while our professional property management teams handle day-to-day operations, tenant relations, maintenance, and rent collection. We take care of the hard work so you don't have to."
  }, {
    icon: <DollarSignIcon size={32} className="text-blue-600" />,
    title: 'Earn Passive Income',
    description: 'Receive regular dividend payments directly to your bank account. Track your investment performance, occupancy rates, and property appreciation in real-time through your personalized investor dashboard.'
  }];
  const faqs = [{
    question: 'What is the minimum investment amount?',
    answer: 'Our minimum investment amount starts at $10,000 for most properties. This allows you to start building your real estate portfolio with a relatively modest initial investment while still gaining access to institutional-quality properties.'
  }, {
    question: 'How are returns distributed to investors?',
    answer: 'Returns are distributed to investors on a quarterly basis via direct deposit. These distributions typically represent your share of the rental income after property expenses and management fees have been paid.'
  }, {
    question: 'What fees do investors pay?',
    answer: "We charge a 1% annual asset management fee based on the total value of your investment. There are no hidden fees, and all potential costs are clearly disclosed on each property's investment page before you commit."
  }, {
    question: 'Can I sell my investment before the property is sold?',
    answer: "Yes, we offer a secondary marketplace where investors can sell their shares to other investors after a minimum 12-month holding period. While liquidity isn't guaranteed, this provides a potential exit option before the full investment term."
  }, {
    question: 'How are properties selected for the platform?',
    answer: 'Our team of real estate professionals evaluates hundreds of properties each month, selecting only the top 2-3% that meet our strict investment criteria. We analyze factors including location, cash flow potential, appreciation prospects, and risk profile.'
  }, {
    question: 'Are investments protected if something happens to RealtyVest?',
    answer: 'Yes, each property is held in a separate LLC with investors as members. This means your investment is tied directly to the property itself, not to RealtyVest as a company, providing an important layer of protection.'
  }];
  return <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            How RealtyVest Works
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            We've simplified the real estate investment process, making it easy
            for anyone to build a diversified property portfolio.
          </p>
        </div>
      </div>
      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              Your Investment Journey
            </h2>
            <div className="space-y-12">
              {steps.map((step, index) => <div key={index} className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-full shrink-0 mx-auto md:mx-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-3">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>)}
            </div>
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                Browse Properties Now
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Why Invest With RealtyVest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <PieChartIcon size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Passive Income
              </h3>
              <p className="text-gray-600">
                Earn regular quarterly distributions from rental income without
                the headaches of property management.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <BriefcaseIcon size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Diversification
              </h3>
              <p className="text-gray-600">
                Spread your investment across multiple properties and markets to
                reduce risk and maximize returns.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                <BarChartIcon size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Strong Returns
              </h3>
              <p className="text-gray-600">
                Our properties deliver an average annual return of 8.7%,
                outperforming most traditional investments.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                <ShieldIcon size={24} className="text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Lower Risk
              </h3>
              <p className="text-gray-600">
                Each property undergoes rigorous due diligence and is
                professionally managed to protect your investment.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16" id="faq">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>)}
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                Have more questions about investing with RealtyVest?
              </p>
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium">
                Contact Our Support Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>;
};