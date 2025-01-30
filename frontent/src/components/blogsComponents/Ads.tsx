import { Link } from "react-router-dom";
import AdvertisementIcon from "../../assets/AdvertisementIcon.svg";
const Ads = ({ layout, bgColor }:any) => {
  return (
    <div className={`mx-auto container sm:px-8 mb-16 mt-16 ${bgColor} rounded-md lg:px-32 `}>
      <div className={`flex flex-col lg:flex-row items-center lg:items-start p-4 gap-6 ${layout === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        {/* Image Section */}
        <div className="w-full lg:w-1/3 md:max-w-sm ">
          <img
            src={AdvertisementIcon}
            alt="AdvertisementIcon"
            className={`object-cover w-full h-auto rounded-md`} 
          />
        </div>
        {/* Content Section */}
        <div className={`w-full lg:w-3/4 text-center ${layout === 'right' ? 'lg:text-right' : 'lg:text-left'}  mt-8`}>
          <h1 className="mb-4 font-poppins text-xl md:text-2xl font-medium">
            Buy Cryptocurrency With CoinDcx
          </h1>
          <p className="text-sm md:text-[15px] font-normal font-poppins text-gray-600 leading-relaxed">
            Explore how to buy and sell crypto using Binance Coin. Learn about
            its burn mechanism, and its role in top crypto exchanges like
            Binance. Learn about its burn mechanism benefits, and its role in
            top crypto exchanges.
          </p>
          <div className={`mt-6 flex ${layout === 'right' ? 'flex lg:justify-end' : 'flex lg:justify-start'} max-md:justify-center md:justify-center`}>
            <Link to="#" className="">
              <button className="flex items-center space-x-2 px-6 py-1 text-lg font-semibold bg-[#16D5FF] text-white rounded-md
                       border-2 border-transparent hover:bg-white hover:text-[#16D5FF] hover:border-[#16D5FF] transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#16D5FF] focus:ring-offset-2">
                Buy Cryptocurrency
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ads;
