import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-slate-950/80">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-800 text-slate-400">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 sm:w-44" />
          <p className="max-w-[410px] mt-6 text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            architecto doloribus hic eligendi natus iusto dolorem
            necessitatibus, quia quae voluptatibus fugit, officia totam labore!
            Esse sed deleniti ab harum ducimus.
          </p>
        </div>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-slate-100 md:mb-5 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline transition text-slate-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="py-4 text-center text-sm md:text-base text-slate-500">
        Copyright {new Date().getFullYear()} © QuickBlog - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
