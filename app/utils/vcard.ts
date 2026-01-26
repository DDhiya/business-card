export const generateVCard = () => {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Dhiyaurrahman Danial",
    "N:Danial;Dhiyaurrahman;;;",
    "TITLE:IT Executive",
    "ORG:Universiti Malaysia Pahang Al-Sultan Abdullah",
    "TEL;TYPE=CELL:+60145332637",
    "EMAIL;TYPE=WORK:dhiyadanial@umpsa.edu.my",
    "EMAIL;TYPE=HOME:dhiyadanial@gmail.com",
    "URL:https://linktr.ee/dhiya.danial",
    "ADR;TYPE=WORK:;;Centre for Digital Technology (DiTec);Universiti Malaysia Pahang Al-Sultan Abdullah;Pekan;Pahang;26600;Malaysia",
    "END:VCARD",
  ].join("\n");

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "DhiyaurrahmanDanial.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
