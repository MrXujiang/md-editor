import { saveAs } from 'file-saver';
// import html2pdf from 'html2pdf.js';

export const exportMarkdown = (content: string, filename: string = 'document') => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    saveAs(blob, `${filename}.md`);
};

// export const exportPDF = async (content: string, filename: string = 'document') => {
//     // 创建临时 DOM 元素来渲染 Markdown
//     const element = document.createElement('div');
//     element.innerHTML = content;
//     element.style.padding = '20px';
//     document.body.appendChild(element);
//
//     const options = {
//         margin: 10,
//         filename: `${filename}.pdf`,
//         image: { type: 'jpeg', quality: 0.98 },
//         html2canvas: { scale: 2 },
//         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
//     };
//
//     try {
//         await html2pdf().set(options).from(element).save();
//     } finally {
//         document.body.removeChild(element);
//     }
// };