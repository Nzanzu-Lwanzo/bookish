import { useState } from "react";
import { Trash2, PencilLine, Check } from "../../../../assets/svg";
import { useCallback } from "react";

const CollectionElt = () => {

  const [updating,setUpdating] = useState(false);
  const [collectionName,setCollectionName] = useState('');

  const updateCollectionName = useCallback((event)=>{
    // setCollectionName(collectionName);
    console.log(event.target.value);
    setCollectionName(event.target.value);

  },[collectionName])

  return (
    <li>
      {updating ? (
        <input
          type="text"
          name="collection-name"
          value={collectionName}
          className="name"
          id="collection-name"
          onInput={updateCollectionName}
          autoFocus={updating}
        />
      ) : (
        <span className="name">A collection name</span>
      )}

      <div className="actions">
        <button type="button" className="center">
          <Trash2 />
        </button>
        <button
          type="button"
          className="center"
          onClick={() => setUpdating((prev) => !prev)}
        >
          {!updating ? <PencilLine /> : <Check />}
        </button>
      </div>
    </li>
  );
};

export default CollectionElt;
