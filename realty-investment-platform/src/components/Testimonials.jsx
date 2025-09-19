import React from 'react';
import { StarIcon } from 'lucide-react';
export const Testimonials = () => {
  const testimonials = [{
    name: 'Sarah Johnson',
    role: 'Real Estate Investor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    quote: 'RealtyVest has completely transformed my investment strategy. The platform is intuitive, the properties are high-quality, and the returns have exceeded my expectations.',
    stars: 5
  }, {
    name: 'Michael Chen',
    role: 'Financial Advisor', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    quote: 'I recommend RealtyVest to all my clients looking to diversify into real estate. The transparency and detailed analytics make it easy to make informed investment decisions.',
    stars: 5
  }, {
    name: 'Emily Rodriguez',
    role: 'First-time Investor',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
    quote: "As someone new to real estate investing, I was nervous about getting started. RealtyVest made the process simple and straightforward. I'm now earning consistent returns on my first property.",
    stars: 4
  }];
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Investors Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied investors who are building wealth
            through our real estate investment platform.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} className={i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};