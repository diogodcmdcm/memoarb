import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import QRCode from 'react-qr-code';
import { createRoot } from 'react-dom/client'; // Para renderizar o QR Code em um elemento DOM

async function GeneratePdf(title, link) {
    // Criar um novo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // Largura: 595.28, Altura: 841.89 (tamanho A4)

    // Adicionar texto ao PDF
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    page.drawText(title, {
        x: 50,
        y: 800,
        size: 18,
        font,
        color: rgb(0, 0, 0),
    });

    // Gerar o QR Code usando react-qr-code
    const qrCodeContainer = document.createElement('div'); // Criar um contêiner para o QR Code
    document.body.appendChild(qrCodeContainer); // Adicionar o contêiner ao DOM
    const root = createRoot(qrCodeContainer); // Usar createRoot para renderizar o QR Code
    root.render(<QRCode value={link} />); // Renderizar o QR Code no contêiner

    // Aguardar o React renderizar o QR Code
    await new Promise((resolve) => setTimeout(resolve, 100)); // Aguardar um breve momento

    // Converter o QR Code (SVG) para uma imagem base64
    const qrCodeSvg = qrCodeContainer.querySelector('svg'); // Selecionar o SVG gerado
    if (!qrCodeSvg) {
        throw new Error('O elemento SVG do QR Code não foi encontrado.');
    }
    const qrCodeDataUrl = await svgToDataUrl(qrCodeSvg); // Converter SVG para Data URL

    // Inserir o QR Code no PDF
    const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
    page.drawImage(qrCodeImage, {
        x: 222.64,
        y: 550,
        width: 150,
        height: 150,
    });

    // Salvar o PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const linkElement = document.createElement('a');
    linkElement.href = URL.createObjectURL(blob);
    linkElement.download = 'qrcode.pdf';
    linkElement.click();

    // Limpar o contêiner do QR Code
    document.body.removeChild(qrCodeContainer);
}

// Função para converter SVG para Data URL
function svgToDataUrl(svgElement) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        };

        // Serializar o SVG para uma string e criar uma URL de dados
        const svgString = new XMLSerializer().serializeToString(svgElement);
        img.src = `data:image/svg+xml;utf8,${encodeURIComponent(svgString)}`;
    });
}

export default GeneratePdf;