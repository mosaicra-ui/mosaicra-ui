import React from 'react';
import Image from 'next/image';

const FileName = ({ icon, fileName }) => {
  const iconSrc = `packages/svgs/icons/${icon}.svg`;

  return (
    <div className="file-name flex items-center space-x-2">
      <span className="file-icon">
        <Image src={iconSrc} alt={icon} width={24} height={24} />
      </span>
      <b>{fileName}</b>
    </div>
  );
};

export default FileName;