import react from 'react';
import Breast from './Breast';
import Countouring from './Countouring';
import Eyes from './Eyes';
import FatGrafting from './FatGrafting';
import Lifting from './Lifting';
import Liposuction from './Liposuction';
import Nose from './Nose';
import Skin from './Skin';

interface PartProp {
    partList: string[]
}

const PartComponent: React.FC<PartProp> = ({partList}) => {
    console.log(partList);
    return (
        <div style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto'}}>
            {partList && partList.map((item, index) => {
                switch (item) {
                    case 'breast':
                        return <Breast key={index} />;
                    case 'countouring':
                        return <Countouring key={index} />;
                    case 'eyes':
                        return <Eyes key={index} />;
                    case 'fatGrafting':
                        return <FatGrafting key={index} />;
                    case 'lifting':
                        return <Lifting key={index} />;
                    case 'liposuction':
                        return <Liposuction key={index} />;
                    case 'nose':
                        return <Nose key={index} />;
                    case 'skin':
                        return <Skin key={index} />;
                    default:
                        return null;
                }
            })}
        </div>
    );
}

export default PartComponent;