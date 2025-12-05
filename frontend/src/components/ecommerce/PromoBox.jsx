import React from 'react';
import config from '@/config';
import Image from 'next/image';


const PromoCards = () => {
    const cards = [
        {
            title: 'Everyday Fresh & Clean with Our Products',
            image: `${config.publicPath}/images/promo/banner-1.png`,
            bg: 'bg-amber-50',
        },
        {
            title: 'Make your Breakfast Healthy and Easy',
            image: `${config.publicPath}/images/promo/banner-2.png`,
            bg: 'bg-pink-50',
        },
        {
            title: 'The best Organic Products Online',
            image: `${config.publicPath}/images/promo/banner-3.png`,
            bg: 'bg-blue-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative rounded-xl overflow-hidden">
        {cards.map((card, index) => (
            <div
                key={index}
                className={`flex flex-col ${card.bg}`}
            >
                <div className="w-[300px] absolute">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4  font-quicksand  mt-8 ml-8">{card.title}</h3>
                </div>
               
                <Image 
                    src={card.image} 
                    alt="..." 
                    width={500} 
                    height={300} 
                    className="h-full object-contain mx-auto rounded-xl" // Added rounded-xl here
                />
                <div className="absolute bottom-8 ml-8">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm w-max self-start">
                        Shop Now →
                    </button>
                </div>
            </div>
        ))}
    </div>
    
    );
};

export default PromoCards;
