import React, { memo } from 'react';

const Header = memo(() => {
  return (
    <div className="relative shadow-md rounded-md overflow-hidden">
      <div
        className="w-full h-96"
        style={{
          backgroundImage: 'url("/bg.jpg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className='bg-white h-12 flex items-center'>
        <div className='flex justify-between w-full'>
          <div>left</div>
          <div>right</div>
        </div>
      </div>
    </div>
  );
});

export default Header;
