import React, {useEffect, useRef} from "react";
import ScrollableBox from "./models/ScrollableBox";
import GridWidget from "./widget/GridWidget";
import CubeOverlay from "../CubeOverlay";

function ScrollBox({children, color}) {
  const ref = useRef()
  const cubeRef = useRef()
  const contentRef = useRef()

  useEffect(() => {
    const gridWidget = new GridWidget([...cubeRef.current.children]);
    const scrollableBox = new ScrollableBox(ref.current, contentRef.current, cubeRef.current, 2000)
    scrollableBox.onProgress(gridWidget.onProgress)
    scrollableBox.run()
  }, [])

  return <div ref={ref} >
      <div ref={contentRef} style={{display: "grid", gridTemplateRows: "1fr 1fr", width: "100%"}}>
        {children(<CubeOverlay ref={cubeRef} color={color}/>)}
      </div>
  </div>
}

export default ScrollBox
