import React from "react";

const Newsletter = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold text-slate-100">
        Never Miss a Blog!
      </h1>
      <p className="md:text-lg text-slate-400 pb-8">
        Subscribe to get the latest blog, new tech, and exclusive news.
      </p>
      <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12 rounded-lg overflow-hidden border border-slate-800 bg-slate-900/80 shadow-lg shadow-black/20">
        <input
          className="h-full px-3 text-slate-200 bg-transparent outline-none w-full placeholder:text-slate-500"
          type="text"
          placeholder="Enter your email id"
          required
        />
        <button
          type="submit"
          className="h-full px-8 text-white bg-primary hover:bg-primary/90 transition-all cursor-pointer"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
