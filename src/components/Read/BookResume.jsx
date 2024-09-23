import { decode } from "html-entities";
import DOMPurify from "dompurify";
import ReactSafelySetInnerHTML from "react-safely-set-inner-html";

const BookResume = ({ resume }) => {

    const entitiesFree = decode(resume);
    const pureHtml = DOMPurify.sanitize(entitiesFree);

  return <article>
    <ReactSafelySetInnerHTML excludedTags={['iframes','script','style']}>
        {pureHtml}
    </ReactSafelySetInnerHTML>
    </article>;
};

export default BookResume;
