import type { Profile, Contact } from "../types";

export const generateVCard = (profile: Profile, contacts: Contact[]) => {
  const emails = contacts.filter(c => c.type === 'email');
  const phone = contacts.find(c => c.type === 'phone');

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profile.name}`,
    `TITLE:${profile.title}`,
    `ORG:${profile.organization}`,
    phone ? `TEL;TYPE=CELL:${phone.value}` : "",
    ...emails.map(e => `EMAIL;TYPE=${e.label.includes('Personal') ? 'HOME' : 'WORK'}:${e.value}`),
    profile.bio ? `NOTE:${profile.bio}` : "",
    "END:VCARD",
  ].filter(line => line !== "").join("\n");

  const blob = new Blob([vcard], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${profile.name.replace(/\s+/g, '')}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
