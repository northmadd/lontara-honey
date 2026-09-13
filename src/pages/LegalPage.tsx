import { Link, useParams } from 'react-router-dom';

const pages: Record<string, { title: string; updated: string; sections: { heading: string; text: string }[] }> = {
  privacy: { title: 'Privacy Policy', updated: '23 August 2026', sections: [
    { heading: 'Information we collect', text: 'We collect the name, telephone number, country code, and message you submit through our contact and order forms.' },
    { heading: 'How we use it', text: 'We use this information solely to respond to enquiries, prepare quotations, confirm orders, arrange shipping, and provide customer support.' },
    { heading: 'Third parties', text: 'Order messages are sent to WhatsApp. The website also uses Google Maps and flag images supplied by FlagCDN. Their privacy practices apply when you use those services.' },
    { heading: 'Contact', text: 'For privacy questions, contact lontarajayanusantara@gmail.com.' },
  ]},
  terms: { title: 'Terms & Conditions', updated: '23 August 2026', sections: [
    { heading: 'Order confirmation', text: 'An order is accepted only after Lontara Honey confirms product availability, price, payment method, and shipping arrangement in writing.' },
    { heading: 'Product information', text: 'Product images are illustrative. Natural honey may vary in colour, aroma, and texture between batches.' },
    { heading: 'International orders', text: 'Shipping costs, customs duties, taxes, import permissions, and delivery timelines are agreed with the buyer for the destination country before payment.' },
  ]},
  shipping: { title: 'Shipping Policy', updated: '23 August 2026', sections: [
    { heading: 'Shipping partners', text: 'Available logistics partners include DHL, FedEx, Attaba Express, Forwarder SBL, and ALFI Logistik.' },
    { heading: 'Quotation', text: 'Shipping method, charges, transit time, insurance, customs handling, and destination eligibility depend on the buyer agreement and destination country.' },
    { heading: 'Tracking', text: 'A tracking number or shipment reference is provided when available from the selected logistics partner.' },
  ]},
  refund: { title: 'Refund & Return Policy', updated: '23 August 2026', sections: [
    { heading: 'Damaged shipments', text: 'Report damaged or incorrect shipments within 7 days after delivery and include a clear unboxing video, product photos, and order details.' },
    { heading: 'Review', text: 'Each eligible claim is reviewed with the exporter and relevant logistics partner. Resolution may include replacement, partial refund, or refund as agreed in writing.' },
    { heading: 'Non-returnable items', text: 'Opened, consumed, incorrectly stored, or buyer-damaged products are not eligible for return unless required by applicable law.' },
  ]},
  faq: { title: 'Frequently Asked Questions', updated: '23 August 2026', sections: [
    { heading: 'Do you ship internationally?', text: 'Yes. Contact us with your destination and order quantity for a shipping quotation.' },
    { heading: 'Which payment methods are available?', text: 'Bank Mandiri transfer is currently available. PayPal is coming soon.' },
    { heading: 'Are certificates available?', text: 'Halal, NKV, HACCP, and laboratory-test documents are available on request.' },
    { heading: 'How do I make a wholesale enquiry?', text: 'Send your required quantity, destination country, and preferred shipping terms through WhatsApp or the contact form.' },
  ]},
};

const LegalPage = () => {
  const { page = '' } = useParams();
  const content = pages[page];
  if (!content) return <main className="min-h-screen p-10">Page not found.</main>;
  return <main className="min-h-screen bg-background py-16 text-foreground"><article className="container mx-auto max-w-3xl px-5"><Link to="/" className="text-sm text-primary hover:underline">← Back to Lontara Honey</Link><h1 className="mt-8 font-serif text-4xl font-bold">{content.title}</h1><p className="mt-2 text-sm text-muted-foreground dark:text-white/80">Last updated: {content.updated}</p><div className="mt-10 space-y-8">{content.sections.map((section) => <section key={section.heading}><h2 className="text-xl font-semibold">{section.heading}</h2><p className="mt-2 leading-7 text-muted-foreground dark:text-white/80">{section.text}</p></section>)}</div><p className="mt-12 text-sm text-muted-foreground dark:text-white/80">Lontara Honey · PT Lontara Jaya Nusantara · South Sulawesi, Indonesia</p></article></main>;
};
export default LegalPage;
