// Importa el componente QRCode
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
// Tu componente React
function QRCodeComponent({socket}) {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    // Emitir el evento para solicitar el QR al servidor
    socket.emit('eventoObtenerQR');

    // Escuchar el evento 'qrValue' desde el servidor
    socket.on('qrValue', (qrValue) => {
        console.log('QR Value Received:', qrValue);
        setQrCode(qrValue);
    });

    // Limpiar el socket al desmontar el componente
    return () => {
        socket.off('qrValue');
    };
}, []);
  // Contenido del QR que quieres mostrar
  console.log(qrCode)
  console.log("socket:");
  console.log(socket);
  return (
    <div>
      <h1>Escanea el código QR</h1>
      <QRCode value={qrCode} />
    </div>
  );
}

export default QRCodeComponent;
