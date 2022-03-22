import React from "react";
import { useHistory } from "react-router-dom";

function SelectMaterialTab ({materials, selectMaterial, selectedMaterial}) {
  const history = useHistory();
  console.log(selectedMaterial);
  const handleClick = (id) => {
      history.push('/form-tab');
      selectMaterial(id);
  }

  return (
    <div className="row tab-row">
       <div className="col-md-12">
         <h3 className="section_header text-center section-mini-header" style={{marginBottom: '40px'}}>Select Material</h3>
      </div>
      <div className="grid-calc">
      {materials.map(({ id, image, name }) => (
        <div
          className={selectedMaterial?.id === id ? 'active-calculator-item text-center calc-item' : ' text-center calc-item'}
          style={{ marginBottom: 50, cursor: 'pointer' }}
          onClick={() => handleClick(id)}
          key={`img-block-${id}-${image}-${name}`}
        >
          <img src={image} className="rounded-image-calc" />
          <h6>
            {name}
          </h6>
        </div>
      ))}   
      </div>
    </div>
  )
}

export default SelectMaterialTab;
