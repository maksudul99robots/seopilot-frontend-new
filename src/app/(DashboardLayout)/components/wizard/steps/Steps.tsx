const Steps = ()=>{

    let styleActive = {paddingTop:"20px", paddingBottom:"10px", marginRight:"25px", fontSize:"18px", fontWeight:"600", color:"#3E97FF", borderBottom:"2px #3E97FF solid"};
    let styleInactive = {paddingTop:"20px", paddingBottom:"10px", marginRight:"25px", fontSize:"18px", fontWeight:"600"};

    return(
        <>
        <div style={styleActive}> Overview</div>
        <div style={styleInactive}> Ads Placement</div>
        <div style={styleInactive}> Review</div>
        </>
    )
}

export default Steps;