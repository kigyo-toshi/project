import { useId, useState } from 'react';

function AccordionItem({ title, content }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return <div className="accordion-item" role="listitem">
    <button type="button" id={`${id}-button`} className="accordion-btn" aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => setOpen((value) => !value)}>{title}</button>
    <div id={`${id}-panel`} className="accordion-content" role="region" aria-labelledby={`${id}-button`} hidden={!open}>{content}</div>
  </div>;
}

export function Accordion({ items }) {
  return <div className="accordion" role="list">{items.map((item, index) => <AccordionItem key={index} {...item} />)}</div>;
}
