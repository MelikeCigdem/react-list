import {useEffect, useState} from "react";

export default function Navbar(){
    const [list, setList] = useState([])
    const [showPopup, setShowPopup] = useState(false)

    const getList = () => {
        setList(
            response.data
        )
    }

    useEffect(() => {
        getList()
        console.log("çalıştı")
    },[showPopup])



    return(
        <div>
            <button onClick={() => setShowPopup(true)}>Listeyi göster</button>
                {
                    list.length && list.map(item => {
                        return (
                            <>
                                <div>{item.name}</div>
                                <div>{item.surName}</div>
                            </>
                        )
                    })
                }
        </div>
    )
}