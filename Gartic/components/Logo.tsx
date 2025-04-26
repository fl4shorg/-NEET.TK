
import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-2 font-bold text-xl ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z" fill="#9b87f5" />
        <path d="M16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10Z" fill="white" />
        <path d="M10 16C8.89543 16 8 16.8954 8 18C8 19.1046 8.89543 20 10 20C11.1046 20 12 19.1046 12 18C12 16.8954 11.1046 16 10 16Z" fill="white" />
        <path d="M22 16C20.8954 16 20 16.8954 20 18C20 19.1046 20.8954 20 22 20C23.1046 20 24 19.1046 24 18C24 16.8954 23.1046 16 22 16Z" fill="white" />
        <path d="M12 12L9 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 12L23 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600">
        NeextGartic
      </span>
    </div>
  );
};

export default Logo;
