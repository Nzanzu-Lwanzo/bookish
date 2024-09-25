import { useState } from "react"

const useConfirmDeletion = () => {
  
    return {

        confirmDeletion : function(message) {

            const deletionValidated = confirm(message);

            return deletionValidated;
        }

    }


}

export default useConfirmDeletion