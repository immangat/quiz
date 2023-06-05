import {Dna} from 'react-loader-spinner'
export default function Loader() {
    return (
        <div className="loader">
            <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};