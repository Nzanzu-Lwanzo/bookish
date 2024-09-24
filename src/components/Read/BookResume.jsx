import { decode } from "html-entities";
import DOMPurify from "dompurify";
import ReactSafelySetInnerHTML from "react-safely-set-inner-html";

const BookResume = ({ resume, title }) => {

    const entitiesFree = decode(resume);
    const pureHtml = DOMPurify.sanitize(entitiesFree);

  return (
    <article>
      <h2 className="special-title-for-book">{title}</h2>
    <ReactSafelySetInnerHTML excludedTags={['iframes','script','style']}>
        {pureHtml}
    </ReactSafelySetInnerHTML>
    </article>
  )
};

export default BookResume;
