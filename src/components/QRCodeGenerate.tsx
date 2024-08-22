import React from "react";
import { QRCode } from "react-qrcode-logo";

type QRCodeGenerateProps = {
  value: string;
};

const QRCodeGenerate: React.FC<QRCodeGenerateProps> = ({ value }) => {
  return (
    <div>
      <QRCode
        value={value}
        logoImage="/favicon.png"
        size={256}
        logoWidth={64}
        logoHeight={64}
        logoOpacity={1}
        qrStyle="dots"
        fgColor="rgb(31 41 55)"
      />
    </div>
  );
};

export default QRCodeGenerate;
