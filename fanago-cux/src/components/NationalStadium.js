import { useEffect, useRef, useState } from "react"

export default function NationalStadium({ seatMap, onSeatSelect }) {
  const gRef = useRef(null)

  const selectSeat = (seatId) => {
    onSeatSelect(seatId)
  }

  const invalidAreas = seatMap
    .filter((seat) => seat.noOfSeat === 0)
    .map((seat) => seat.position)

  useEffect(() => {
    const g = gRef.current
    const elements = g.querySelectorAll("g")
    elements.forEach((gElement) => {
      if (!invalidAreas.includes(gElement.id)) {
        gElement.addEventListener("mouseover", () => {
          for (let i = 0; i < gElement.children.length; i++) {
            gElement.children[i].style.fill = "#808080"
          }
        })
        gElement.addEventListener("mouseout", () => {
          for (let i = 0; i < gElement.children.length; i++) {
            gElement.children[i].style.fill = ""
          }
        })
        gElement.addEventListener("click", () => {
          selectSeat(gElement.id)
        })
      } else {
        gElement.style.cursor = "not-allowed"
        gElement.style.pointerEvents = "none"
      }
    })
  }, [onSeatSelect])

  return (
    <div className="w-full">
      <svg
        className=" h-[35vh] w-full max-w-full md:h-[40vh] lg:h-[75vh]"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="1062.3px"
        height="963.4px"
        viewBox="109.24 67.2 830.26 513.7"
        enableBackground="new 0 0 1062.3 963.4"
        xmlSpace="preserve"
      >
        <g ref={gRef}>
          <g id="224" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="581.7,152.5 615.1,78.8 667.7,107.3 593.8,159"></polygon>
              <polygon points="615.2,79.2 667.2,107.3 593.8,158.7 582.1,152.4"></polygon>
              <polygon points="593.5,158.6 667.4,106.8 668.7,115.2 594.7,167"></polygon>
              <polygon points="667.2,107.3 668.4,115.1 594.9,166.5 593.8,158.7"></polygon>
              <polygon points="582.9,160.4 581.7,151.9 594.1,158.5 595.3,167"></polygon>
              <polygon points="593.8,158.7 594.9,166.5 583.2,160.2 582.1,152.4"></polygon>
            </g>
          </g>
          <g id="225" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="527.9,95 526.7,87 527.3,86.9 550.5,142.6 551.7,150.6 551.1,150.7"></polygon>

              <polygon points="550.2,142.7 551.4,150.6 528.2,94.9 527,87"></polygon>

              <polygon points="549.9,142.5 563.1,139.7 564.3,148 551.2,150.9"></polygon>

              <polygon points="562.9,140 564,147.8 551.4,150.6 550.2,142.7"></polygon>

              <polygon points="575.4,154.5 574.3,146.7 597.3,69.5 597.9,69.6 599,77.4 576,154.6"></polygon>

              <polygon points="597.6,69.6 598.7,77.4 575.7,154.5 574.6,146.7"></polygon>

              <polygon points="562.7,140.3 550,143 526.6,86.8 598,69.2 574.8,146.9 564.6,149"></polygon>

              <polygon points="527,87 597.6,69.6 574.6,146.7 564.8,148.7 562.9,140 550.2,142.7"></polygon>

              <polygon points="564.5,148.5 574.8,146.4 576,154.7 565.8,156.8"></polygon>

              <polygon points="574.6,146.7 575.7,154.5 566,156.5 564.8,148.7"></polygon>
              <polygon points="563.7,147.9 562.6,140 563.2,139.9 565.1,148.6 566.3,156.5 565.7,156.6"></polygon>
              <polygon points="564.8,148.7 566,156.5 564,147.8 562.9,140"></polygon>
            </g>
          </g>
          <g id="226" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="517,150.4 541.8,143.2 543,151.7 518.3,158.8"></polygon>

              <polygon points="541.6,143.6 542.7,151.5 518.5,158.4 517.3,150.6"></polygon>

              <polygon
                points="475.6,129.6 454.6,105.7 519.2,89.1 524,101 542,143.8 517.6,150.8 521.3,166.3 509.4,168.4
				"
              ></polygon>

              <polygon
                points="455.1,105.9 519,89.4 523.7,101.1 541.6,143.6 517.3,150.6 521,166.1 509.5,168.1 475.8,129.4 
							"
              ></polygon>

              <polygon points="509.2,167.9 521.2,165.8 522.5,174.1 510.4,176.2"></polygon>

              <polygon points="521,166.1 522.2,173.9 510.6,175.9 509.5,168.1"></polygon>

              <polygon points="476.7,137.3 475.4,128.5 509.8,168 511,176.8"></polygon>

              <polygon points="509.5,168.1 510.6,175.9 477,137.2 475.8,129.4"></polygon>

              <polygon points="456,113.8 454.7,105 476.1,129.3 477.4,138.1"></polygon>

              <polygon points="475.8,129.4 477,137.2 456.3,113.7 455.1,105.9"></polygon>
            </g>
          </g>
          <g id="227" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="411.7,145.1 410.5,136.6 423.5,143.5 424.7,152.1"></polygon>

              <polygon points="423.2,143.7 424.3,151.6 412,144.9 410.9,137.1"></polygon>

              <polygon points="424,151.8 422.8,143.2 453.3,159.7 454.6,168.2"></polygon>

              <polygon points="453,159.9 454.2,167.7 424.3,151.6 423.2,143.7"></polygon>

              <polygon points="453.9,167.9 452.6,159.4 491.7,180.5 493,189"></polygon>

              <polygon points="491.4,180.7 492.6,188.5 454.2,167.7 453,159.9"></polygon>

              <polygon points="491.1,180.6 506.9,169.5 508.1,177.9 492.4,189"></polygon>

              <polygon points="506.7,170 507.8,177.8 492.6,188.5 491.4,180.7"></polygon>

              <polygon
                points="452.9,160.1 423.1,143.9 410.4,137.1 449.3,109.7 458.3,119.1 479.5,141.3 507.1,170 491.4,181 
							"
              ></polygon>

              <polygon
                points="449.3,110.1 458.1,119.3 479.3,141.5 506.7,170 491.4,180.7 453,159.9 423.2,143.7 410.9,137.1 
							"
              ></polygon>
            </g>
          </g>
          <g id="223" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1a7a7"
                points="673,150.3 710.3,124.2 711.6,132.6 674.3,158.7"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="710.1,124.7 711.3,132.5 674.5,158.2 673.3,150.4"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="631.7,179.3 673.5,149.9 674.8,158.3 632.9,187.7"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="673.3,150.4 674.5,158.2 633.1,187.2 632,179.4"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="600.8,170.1 599.5,161.6 632.3,179.2 633.5,187.7"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="632,179.4 633.1,187.2 601.1,169.9 599.9,162.1"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="599.4,162.1 641.1,132.9 678,107 710.6,124.7 673.5,150.6 632,179.7"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="678,107.3 710.1,124.7 673.3,150.4 632,179.4 599.9,162.1 641.3,133.1"
              ></polygon>
            </g>
          </g>
          <g id="222" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1a7a7"
                points="711.3,171.1 748.6,144.9 749.8,153.3 712.6,179.5"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="748.4,145.4 749.5,153.2 712.8,179 711.6,171.2"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="669.9,200 711.8,170.7 713.1,179.1 671.2,208.5"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="711.6,171.2 712.8,179 671.4,208 670.2,200.1"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="639.2,190.9 638,182.4 670.5,199.9 671.8,208.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="670.2,200.1 671.4,208 639.5,190.7 638.4,182.9"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="637.9,182.9 679.5,153.7 716.5,127.9 748.9,145.4 711.8,171.4 670.2,200.4"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="716.5,128.2 748.4,145.4 711.6,171.2 670.2,200.1 638.4,182.9 679.7,153.9"
              ></polygon>
            </g>
          </g>
          <g id="221" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1a7a7"
                points="751,192.6 788.3,166.4 789.5,174.8 752.2,201"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="788.1,166.9 789.2,174.7 752.4,200.5 751.3,192.7"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="709.6,221.5 751.5,192.2 752.7,200.6 710.9,229.9"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="751.3,192.7 752.4,200.5 711.1,229.4 709.9,221.6"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="678.7,212.3 677.5,203.8 710.2,221.4 711.5,229.9"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="709.9,221.6 711.1,229.4 679,212.1 677.9,204.3"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="677.4,204.3 719,175.1 756,149.3 788.6,166.9 751.5,192.9 709.9,221.9"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="756,149.6 788.1,166.9 751.3,192.7 709.9,221.6 677.9,204.3 719.2,175.3"
              ></polygon>
            </g>
          </g>
          <g id="220" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1a7a7"
                points="790.8,214.1 828.1,188 829.4,196.4 792.1,222.6"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="827.9,188.5 829.1,196.3 792.3,222.1 791.1,214.2"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="749.5,243.1 791.3,213.7 792.6,222.2 750.7,251.5"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="791.1,214.2 792.3,222.1 750.9,251 749.8,243.2"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="718.7,234 717.5,225.4 750.1,243 751.3,251.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="749.8,243.2 750.9,251 719,233.8 717.9,225.9"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="717.4,225.9 758.9,196.9 796,170.9 828.4,188.5 791.3,214.4 749.8,243.5"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="796,171.2 827.9,188.5 791.1,214.2 749.8,243.2 717.9,225.9 759.1,197.1"
              ></polygon>
            </g>
          </g>
          <g id="219" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1a7a7"
                points="829.5,235.1 866.7,208.9 868,217.3 830.7,243.5"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="866.5,209.4 867.7,217.2 830.9,243 829.8,235.2"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="829.2,235.1 830,234.8 831.2,243.2 830.5,243.5"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="829.8,235.2 830.9,243 830.7,243.1 829.5,235.3"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="788.1,264 829.7,234.8 831,243.2 789.4,272.4"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="829.5,235.3 830.7,243.1 789.6,271.9 788.4,264.1"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="757.6,255 756.3,246.5 788.7,263.9 790,272.4"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="788.4,264.1 789.6,271.9 757.9,254.8 756.7,247"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="756.2,247 797.7,217.9 834.8,191.9 867,209.4 830,235.4 829.6,235.6 788.4,264.4"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="834.8,192.2 866.5,209.4 829.8,235.2 829.5,235.3 788.4,264.1 756.7,247 797.9,218.1"
              ></polygon>
            </g>
          </g>
          <g id="228" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="372.6,172.5 371.3,164 384.4,170.9 385.6,179.5"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="384.1,171.1 385.2,179 372.9,172.3 371.7,164.5"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="384.9,179.2 383.7,170.6 452.6,207.9 453.9,216.4"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="452.3,208.1 453.5,215.9 385.2,179 384.1,171.1"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="452,208 487.6,183 488.9,191.4 453.3,216.4"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="487.4,183.5 488.6,191.3 453.5,215.9 452.3,208.1"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="384,171.3 371.2,164.5 406.9,139.6 419.3,146.2 487.9,183.5 452.3,208.4"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="406.9,139.9 419.2,146.5 487.4,183.5 452.3,208.1 384.1,171.1 371.7,164.5"
              ></polygon>
            </g>
          </g>
          <g id="229" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="333.2,200.1 332,191.5 345,198.5 346.3,207"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="344.7,198.7 345.9,206.5 333.5,199.9 332.4,192"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="345.6,206.7 344.3,198.2 413.2,235.4 414.5,244"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="412.9,235.6 414.1,243.5 345.9,206.5 344.7,198.7"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="412.6,235.5 446.8,211.6 448.1,220 413.9,244"
              ></polygon>
              <polygon
                fill="#f1a7a7"
                points="446.6,212.1 447.8,219.9 414.1,243.5 412.9,235.6"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="344.6,198.9 331.9,192 366.1,168.1 378.5,174.9 447.1,212.1 412.9,235.9"
              ></polygon>
              <polygon
                fill="#f3a7a7"
                points="366.1,168.4 378.4,175.1 446.6,212.1 412.9,235.6 344.7,198.7 332.4,192"
              ></polygon>
            </g>
          </g>
          <g id="PC1_B" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#97cfe7"
                points="555.9,233.9 587.5,211.7 588.7,220.1 557.1,242.3"
              ></polygon>

              <polygon
                fill="#97cfe7"
                points="587.3,212.2 588.4,220 557.3,241.8 556.2,234"
              ></polygon>

              <polygon
                fill="#95c9e1"
                points="456,238.4 454.7,229.9 530.8,271 532,279.5"
              ></polygon>

              <polygon
                fill="#95c9e1"
                points="530.5,271.2 531.6,279 456.3,238.2 455.1,230.4"
              ></polygon>

              <polygon
                fill="#97cfe9"
                points="454.6,230.4 504,195.8 543.4,188.1 587.8,212.2 556.7,234 572.2,242.4 530.5,271.5"
              ></polygon>

              <polygon
                fill="#97cfe9"
                points="504.1,196.1 543.4,188.4 587.3,212.2 556.2,234 571.7,242.4 530.5,271.2 455.1,230.4"
              ></polygon>

              <polygon
                fill="#97cfe7"
                points="530.2,271.1 571.9,241.9 573.1,250.3 531.4,279.5"
              ></polygon>

              <polygon
                fill="#97cfe7"
                points="571.7,242.4 572.8,250.2 531.6,279 530.5,271.2"
              ></polygon>
            </g>
          </g>
          <g id="PC1_VIP" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1ef9d"
                points="424.4,251.6 455.1,230.1 531,271.2 500.3,292.7"
              ></polygon>

              <polygon
                fill="#f1ef9d"
                points="455.1,230.4 530.5,271.2 500.3,292.4 424.9,251.6"
              ></polygon>

              <polygon
                fill="#e9e79b"
                points="425.7,259.6 424.5,251.1 500.6,292.2 501.8,300.7"
              ></polygon>

              <polygon
                fill="#e9e79b"
                points="500.3,292.4 501.4,300.2 426,259.4 424.9,251.6"
              ></polygon>

              <polygon
                fill="#f1ed9d"
                points="500,292.3 530.7,270.7 531.9,279.1 501.2,300.7"
              ></polygon>

              <polygon
                fill="#f1ed9d"
                points="530.5,271.2 531.6,279 501.4,300.2 500.3,292.4"
              ></polygon>
            </g>
          </g>
          <g id="PB1_B" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#97cfe9"
                points="539.7,276.5 583.3,246 658.8,286.9 615.2,317.4"
              ></polygon>

              <polygon
                fill="#97cfe9"
                points="583.3,246.3 658.3,286.9 615.2,317.1 540.2,276.5"
              ></polygon>

              <polygon
                fill="#97cfe7"
                points="614.9,317 658.5,286.4 659.7,294.9 616.2,325.4"
              ></polygon>

              <polygon
                fill="#97cfe7"
                points="658.3,286.9 659.4,294.8 616.4,324.9 615.2,317.1"
              ></polygon>

              <polygon
                fill="#95c9e1"
                points="541.1,284.5 539.8,276 615.5,316.9 616.8,325.4"
              ></polygon>

              <polygon
                fill="#95c9e1"
                points="615.2,317.1 616.4,324.9 541.4,284.3 540.2,276.5"
              ></polygon>
            </g>
          </g>
          <g id="PB1_VIP" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1ed9d"
                points="584.7,338.1 615.4,316.6 616.7,325 585.9,346.6"
              ></polygon>

              <polygon
                fill="#f1ed9d"
                points="615.2,317.1 616.4,324.9 586.1,346.1 585,338.2"
              ></polygon>

              <polygon
                fill="#f1ef9d"
                points="509.5,297.6 540.2,276.2 615.7,317.1 585,338.5"
              ></polygon>

              <polygon
                fill="#f1ef9d"
                points="540.2,276.5 615.2,317.1 585,338.2 510,297.6"
              ></polygon>

              <polygon
                fill="#e9e79b"
                points="510.8,305.7 509.6,297.1 585.3,338 586.5,346.6"
              ></polygon>

              <polygon
                fill="#e9e79b"
                points="585,338.2 586.1,346.1 511.1,305.5 510,297.6"
              ></polygon>
            </g>
          </g>
          <g id="PA1_B" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#97cde5"
                points="750.7,336.3 749.5,328.5 756.8,303.5 757.4,303.6 758.6,311.4 751.3,336.4"
              ></polygon>

              <polygon
                fill="#97cde5"
                points="757.1,303.6 758.3,311.4 751,336.3 749.8,328.5"
              ></polygon>
              <polygon
                fill="#97cfe7"
                points="700.5,362.7 750,328 751.3,336.4 701.8,371.1"
              ></polygon>
              <polygon
                fill="#97cfe7"
                points="749.8,328.5 751,336.3 702,370.6 700.8,362.8"
              ></polygon>
              <polygon
                fill="#95c9e1"
                points="626.3,330 625,321.5 701.1,362.6 702.4,371.1"
              ></polygon>
              <polygon
                fill="#95c9e1"
                points="700.8,362.8 702,370.6 626.6,329.8 625.4,322"
              ></polygon>
              <polygon
                fill="#97cfe9"
                points="624.9,322 666.6,292.9 682.1,301.3 713.2,279.5 757.4,303.5 750,328.7 700.8,363.1"
              ></polygon>
              <polygon
                fill="#97cfe9"
                points="666.6,293.2 682.1,301.6 713.2,279.8 757.1,303.6 749.8,328.5 700.8,362.8 625.4,322"
              ></polygon>
            </g>
          </g>
          <g id="PA1_VIP" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#f1ed9d"
                points="670.3,383.9 701,362.3 702.3,370.7 671.5,392.3"
              ></polygon>
              <polygon
                fill="#f1ed9d"
                points="700.8,362.8 702,370.6 671.7,391.8 670.6,384"
              ></polygon>
              <polygon
                fill="#e9e79b"
                points="596.1,351.2 594.8,342.7 670.9,383.8 672.1,392.3"
              ></polygon>
              <polygon
                fill="#e9e79b"
                points="670.6,384 671.7,391.8 596.4,351 595.2,343.2"
              ></polygon>
              <polygon
                fill="#f1ef9d"
                points="594.7,343.2 625.4,321.7 701.3,362.8 670.6,384.3"
              ></polygon>
              <polygon
                fill="#f1ef9d"
                points="625.4,322 700.8,362.8 670.6,384 595.2,343.2"
              ></polygon>
            </g>
          </g>
          <g id="218" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="874.4,255.4 920.4,243.3 921.6,251.7 875.6,263.8"></polygon>
              <polygon points="920.2,243.7 921.3,251.5 875.8,263.4 874.7,255.6"></polygon>
              <polygon points="869.1,256.8 874.9,255.2 876.1,263.6 870.4,265.2"></polygon>
              <polygon points="874.7,255.6 875.8,263.4 870.6,264.8 869.4,257"></polygon>
              <polygon points="805.6,273.4 869.6,256.6 870.9,265 806.9,281.8"></polygon>
              <polygon points="869.4,257 870.6,264.8 807.1,281.4 805.9,273.6"></polygon>
              <polygon points="796.7,276.2 795.4,267.7 806.2,273.4 807.5,281.9"></polygon>
              <polygon points="805.9,273.6 807.1,281.4 797,276 795.8,268.2"></polygon>
              <polygon
                points="795.3,268.2 836.8,239.2 850.2,229.7 869.7,216 899.3,232.2 921,243.8 874.8,255.9 869.5,257.3 
				805.9,273.9"
              ></polygon>
              <polygon
                points="869.7,216.3 899.2,232.4 920.2,243.7 874.7,255.6 869.4,257 805.9,273.6 795.8,268.2 837,239.4 
				850.4,229.9"
              ></polygon>
            </g>
          </g>
          <g id="217" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="815.4,283.2 831.3,281.9 832.6,290.3 816.7,291.6"></polygon>
              <polygon points="831.1,282.2 832.3,290 816.9,291.3 815.7,283.5"></polygon>
              <polygon points="827.6,290.4 830.7,282.5 815.3,283.8 817.3,278.2 938.5,251.9 917.2,298.7"></polygon>
              <polygon points="817.5,278.4 938,252.3 917,298.4 828,290.2 831.1,282.2 815.7,283.5"></polygon>
              <polygon points="916.7,298.4 938.1,251.3 939.5,260.1 918.1,307.2"></polygon>
              <polygon points="938,252.3 939.2,260.1 918.2,306.2 917,298.4"></polygon>
              <polygon points="829,298.3 827.7,289.9 917.2,298.1 918.5,306.5"></polygon>
              <polygon points="917,298.4 918.2,306.2 829.2,298 828,290.2"></polygon>
            </g>
          </g>
          <g id="216" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="792.7,327.2 791.5,318.8 845.3,331.6 846.5,340"></polygon>
              <polygon points="845,331.8 846.2,339.6 793,327 791.8,319.2"></polygon>
              <polygon
                points="844.9,332.1 791.3,319.4 797,311.2 818.1,310 823.7,298.4 862.7,300.6 915.5,303.4 896.7,344.2 
							"
              ></polygon>
              <polygon
                points="797.2,311.5 818.3,310.3 823.9,298.7 862.7,300.9 915.1,303.7 896.5,343.9 845,331.8 
				791.8,319.2"
              ></polygon>
              <polygon points="845.9,339.8 844.7,331.4 896.8,343.7 898,352.1"></polygon>
              <polygon points="896.5,343.9 897.7,351.7 846.2,339.6 845,331.8"></polygon>
              <polygon points="896.2,343.9 915.2,302.7 916.6,311.5 897.6,352.7"></polygon>
              <polygon points="915.1,303.7 916.3,311.5 897.7,351.7 896.5,343.9"></polygon>
            </g>
          </g>
          <g id="215" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="813.6,361.7 812.4,353.2 843.1,369.8 844.4,378.3"></polygon>
              <polygon points="842.8,370 844,377.8 813.9,361.5 812.8,353.7"></polygon>
              <polygon points="843.7,378 842.4,369.5 854.2,375.8 855.4,384.3"></polygon>
              <polygon points="853.9,376 855,383.8 844,377.8 842.8,370"></polygon>
              <polygon points="842.7,370.2 812.7,353.9 772.6,332.2 786.6,322.5 838.1,335.7 892,349.7 853.9,376.3"></polygon>
              <polygon points="786.7,322.8 838,336 877,346.1 891.3,349.8 853.9,376 842.8,370 812.8,353.7 773.1,332.2"></polygon>
              <polygon points="853.6,375.9 891.5,349.3 892.7,357.7 854.8,384.3"></polygon>
              <polygon points="891.3,349.8 892.4,357.6 855,383.8 853.9,376"></polygon>
              <polygon points="774,340.3 772.7,331.7 813.1,353.5 814.3,362"></polygon>
              <polygon points="812.8,353.7 813.9,361.5 774.3,340.1 773.1,332.2"></polygon>
            </g>
          </g>
          <g id="214" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="735,367.6 733.8,359 804.1,397 805.3,405.6"
              ></polygon>
              <polygon
                fill="#eba5a5"
                points="803.8,397.2 804.9,405.1 735.3,367.4 734.2,359.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="804.6,405.3 803.4,396.7 815.2,403.1 816.4,411.6"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="814.9,403.3 816,411.1 804.9,405.1 803.8,397.2"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="814.6,403.2 849,379 850.3,387.4 815.8,411.6"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="848.8,379.5 850,387.3 816,411.1 814.9,403.3"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="803.7,397.4 733.7,359.5 768.1,335.5 837.9,373.3 849.3,379.5 814.9,403.6"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="768.1,335.8 837.8,373.5 848.8,379.5 814.9,403.3 803.8,397.2 734.2,359.5"
              ></polygon>
            </g>
          </g>
          <g id="213" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="694.2,396.2 692.9,387.6 763.2,425.6 764.5,434.1"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="762.9,425.8 764.1,433.6 694.5,396 693.3,388.1"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="763.8,433.8 762.5,425.3 774.3,431.6 775.6,440.2"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="774,431.8 775.2,439.7 764.1,433.6 762.9,425.8"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="773.7,431.7 807.9,407.8 809.2,416.2 775,440.2"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="807.7,408.3 808.9,416.1 775.2,439.7 774,431.8"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="762.8,426 692.8,388.1 727,364.3 796.7,402.1 808.2,408.3 774,432.1"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="727,364.6 796.6,402.3 807.7,408.3 774,431.8 762.9,425.8 693.3,388.1"
              ></polygon>
            </g>
          </g>
          <g id="212" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="654.4,424 653.1,415.5 678.3,429 679.5,437.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="678,429.2 679.1,437 654.7,423.8 653.5,416"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="678.8,437.2 677.6,428.7 708.3,445.3 709.6,453.8"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="708,445.5 709.2,453.3 679.1,437 678,429.2"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="708.9,453.5 707.6,445 723.4,453.4 724.6,462"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="723.1,453.6 724.2,461.5 709.2,453.3 708,445.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="723.9,461.7 722.7,453.1 734.6,459.5 735.8,468"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="734.3,459.7 735.4,467.5 724.2,461.5 723.1,453.6"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="734,459.6 768.4,435.4 769.7,443.9 735.2,468"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="768.2,435.9 769.4,443.8 735.4,467.5 734.3,459.7"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="723,453.8 707.9,445.8 677.9,429.4 653,416 687.5,391.9 711.9,405.2 742,421.5 757.2,429.7 
				768.7,435.9 734.3,460"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="687.5,392.2 711.8,405.4 741.9,421.7 757.1,429.9 768.2,435.9 734.3,459.7 723.1,453.6 
				708,445.5 678,429.2 653.5,416"
              ></polygon>
            </g>
          </g>
          <g id="211" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="613.6,452.6 612.3,444.1 637.5,457.7 638.8,466.2"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="637.2,457.9 638.4,465.7 613.9,452.4 612.7,444.6"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="638.1,465.9 636.8,457.4 667.5,473.9 668.8,482.4"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="667.2,474.1 668.4,481.9 638.4,465.7 637.2,457.9"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="668.1,482.1 666.8,473.6 682.5,482 683.8,490.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="682.2,482.2 683.4,490 668.4,481.9 667.2,474.1"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="683.1,490.2 681.8,481.7 693.7,488.1 695,496.6"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="693.4,488.3 694.6,496.1 683.4,490 682.2,482.2"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="693.1,488.2 727.8,463.8 729.1,472.3 694.4,496.6"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="727.6,464.3 728.8,472.2 694.6,496.1 693.4,488.3"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="682.1,482.4 637.1,458.1 612.2,444.6 646.9,420.3 671.4,433.7 701.5,449.8 716.5,458.1 
				728.1,464.3 693.4,488.6"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="646.9,420.6 671.3,433.9 701.4,450.1 716.4,458.3 727.6,464.3 693.4,488.3 682.2,482.2 
				667.2,474.1 637.2,457.9 612.7,444.6"
              ></polygon>
            </g>
          </g>
          <g id="210" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="573,481 571.7,472.5 597.1,486.1 598.3,494.7"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="596.8,486.3 597.9,494.2 573.3,480.8 572.1,473"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="597.6,494.4 596.4,485.8 627,502.4 628.3,510.9"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="626.7,502.6 627.9,510.4 597.9,494.2 596.8,486.3"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="627.6,510.6 626.3,502.1 641.9,510.4 643.1,518.9"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="641.6,510.6 642.7,518.4 627.9,510.4 626.7,502.6"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="642.4,518.6 641.2,510.1 653.2,516.5 654.4,525"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="652.9,516.7 654,524.5 642.7,518.4 641.6,510.6"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="652.6,516.6 686.5,492.8 687.7,501.2 653.8,525"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="686.3,493.3 687.4,501.1 654,524.5 652.9,516.7"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="641.5,510.8 626.6,502.8 596.7,486.5 571.6,473 605.5,449.3 630.2,462.7 660.2,478.9 675.1,487 
				686.8,493.3 652.9,517"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="605.5,449.6 630.1,462.9 660.1,479.1 675,487.2 686.3,493.3 652.9,516.7 641.6,510.6 
				626.7,502.6 596.8,486.3 572.1,473"
              ></polygon>
            </g>
          </g>
          <g id="PENA" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#bbede5"
                points="567.9,455.4 645.1,401.3 646.4,409.7 569.2,463.8"
              ></polygon>

              <polygon
                fill="#bbede5"
                points="644.9,401.8 646.1,409.6 569.4,463.3 568.2,455.5"
              ></polygon>

              <polygon
                fill="#b9e7df"
                points="516.6,435 515.3,426.5 568.5,455.3 569.8,463.8"
              ></polygon>

              <polygon
                fill="#b9e7df"
                points="568.2,455.5 569.4,463.3 516.9,434.8 515.7,427"
              ></polygon>

              <polygon
                fill="#bdede5"
                points="515.2,427 592.4,373 645.4,401.8 568.2,455.8"
              ></polygon>

              <polygon
                fill="#bdede5"
                points="592.4,373.3 644.9,401.8 568.2,455.5 515.7,427"
              ></polygon>
            </g>
          </g>
          <g id="PENA_VIP" className="" style={{ cursor: "pointer" }}>
            <g>
              <path
                fill="#f59de3"
                d="M534.5,488.1l-1.3-8.4l0.1-0.1c3.9-2.7,7.9-5.5,11.7-8.2s7.7-5.4,11.6-8.1c3.7-2.6,7.6-5.4,11.4-8
				l0.4-0.3l1.3,8.4l-0.1,0.1c-1.9,1.3-3.8,2.7-5.7,4s-3.8,2.7-5.7,4c-3.9,2.7-7.8,5.5-11.6,8.1c-3.8,2.7-7.8,5.5-11.7,8.2
				L534.5,488.1z M533.8,479.9l1.1,7.2c3.8-2.6,7.6-5.3,11.3-7.9c3.8-2.7,7.7-5.4,11.6-8.1c1.9-1.4,3.8-2.7,5.7-4
				c1.8-1.3,3.7-2.6,5.5-3.9l-1-7.2c-3.7,2.5-7.4,5.2-11,7.7c-3.9,2.7-7.8,5.5-11.6,8.1C541.6,474.5,537.7,477.3,533.8,479.9z"
              ></path>

              <path
                fill="#f59de3"
                d="M568.2,455.5l1.2,7.8c-3.8,2.7-7.6,5.3-11.4,8c-7.8,5.4-15.5,10.9-23.3,16.3l-1.2-7.8
				c7.8-5.4,15.5-10.9,23.3-16.3C560.6,460.8,564.4,458.1,568.2,455.5"
              ></path>

              <path
                fill="#ef9ddd"
                d="M535.1,488.1l-0.5-0.3c-11.3-6.3-22.6-12.6-33.9-18.8c-11.3-6.3-22.6-12.5-33.9-18.8l-0.1-0.1l-1.3-8.5
				l0.5,0.3c22.4,12.4,45.1,25.1,67.1,37.3l0.8,0.4L535.1,488.1z M467.2,449.7c11.3,6.3,22.5,12.5,33.8,18.8
				c11.1,6.2,22.3,12.4,33.4,18.6l-1.1-7.1l-0.5-0.3c-21.8-12.2-44.4-24.8-66.6-37.1L467.2,449.7z"
              ></path>

              <path
                fill="#ef9ddd"
                d="M533.5,479.8l1.2,7.8c-22.6-12.6-45.2-25.1-67.8-37.7l-1.2-7.8C488.3,454.6,510.9,467.2,533.5,479.8"
              ></path>

              <path
                fill="#f79fe5"
                d="M533.5,479.9c-11.4-6.3-22.7-12.7-34.1-19c-11.2-6.2-22.5-12.5-33.7-18.7l-0.4-0.2l0.4-0.3
				c7.5-5.2,15.2-10.6,22.6-15.8c3.8-2.6,7.5-5.3,11.3-7.9l0.1-0.1l69.2,37.4l-0.4,0.3c-1.9,1.3-3.8,2.7-5.7,4s-3.8,2.7-5.7,4
				c-3.9,2.7-7.8,5.4-11.7,8.2c-3.9,2.7-7.7,5.4-11.6,8.1l-0.1,0.1L533.5,479.9z"
              ></path>

              <path
                fill="#f79fe5"
                d="M499.7,418.3l68.6,37.1c-3.8,2.7-7.6,5.3-11.4,8c-7.8,5.4-15.5,10.9-23.3,16.3
				c-22.6-12.6-45.2-25.1-67.8-37.7C477.1,434.2,488.4,426.2,499.7,418.3z"
              ></path>
            </g>
          </g>
          <g id="209" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="534.3,508.1 533,499.6 603.1,537.5 604.4,546"></polygon>

              <polygon points="602.8,537.7 604,545.5 534.6,507.9 533.4,500.1"></polygon>

              <polygon points="603.7,545.7 602.4,537.2 614.4,543.6 615.7,552.1"></polygon>

              <polygon points="614.1,543.8 615.3,551.6 604,545.5 602.8,537.7"></polygon>

              <polygon points="613.8,543.7 647.8,519.9 649,528.3 615.1,552.1"></polygon>

              <polygon points="647.6,520.4 648.7,528.2 615.3,551.6 614.1,543.8"></polygon>

              <polygon points="602.7,537.9 532.9,500.1 566.8,476.4 636.4,514.1 648.1,520.4 614.1,544.1"></polygon>

              <polygon points="566.8,476.7 636.3,514.3 647.6,520.4 614.1,543.8 602.8,537.7 533.4,500.1"></polygon>
            </g>
          </g>
          <g id="230" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="309,216.4 307.8,207.8 321.3,215.1 322.6,223.6"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="321,215.3 322.2,223.1 309.3,216.2 308.2,208.3"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="321.9,223.3 320.6,214.8 337.1,223.6 338.4,232.1"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="336.8,223.8 338,231.6 322.2,223.1 321,215.3"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="337.7,231.8 336.4,223.3 361.1,236.6 362.4,245.1"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="360.8,236.8 362,244.6 338,231.6 336.8,223.8"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="361.7,244.8 360.4,236.3 389.6,252 390.9,260.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="389.3,252.2 390.5,260 362,244.6 360.8,236.8"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="389,252.1 404.4,241.3 405.6,249.7 390.3,260.5"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="404.2,241.8 405.3,249.6 390.5,260 389.3,252.2"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="360.7,237 336.7,224 320.9,215.5 307.7,208.3 322.9,197.7 335.9,204.8 351.7,213.3 375.7,226.2 
				404.7,241.8 389.3,252.5"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="322.9,198 335.8,205 351.6,213.5 375.6,226.4 404.2,241.8 389.3,252.2 360.8,236.8 336.8,223.8 
				321,215.3 308.2,208.3"
              ></polygon>
            </g>
          </g>
          <g id="231" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="230.7,271.2 229.4,262.7 243,269.9 244.2,278.5"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="242.7,270.1 243.8,278 231,271 229.8,263.2"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="243.5,278.2 242.3,269.6 258.6,278.4 259.8,286.9"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="258.3,278.6 259.4,286.4 243.8,278 242.7,270.1"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="259.1,286.6 257.9,278.1 282.9,291.6 284.2,300.2"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="282.6,291.8 283.8,299.7 259.4,286.4 258.3,278.6"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="283.5,299.9 282.2,291.3 310.9,306.8 312.1,315.3"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="310.6,307 311.7,314.8 283.8,299.7 282.6,291.8"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="310.3,306.9 385.9,253.6 387.1,262 311.5,315.3"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="385.7,254.1 386.8,261.9 311.7,314.8 310.6,307"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="282.5,292 258.2,278.8 242.6,270.3 229.3,263.2 305.1,210.2 318,217.2 333.8,225.8 357.8,238.8 
				386.2,254.1 310.6,307.3"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="305.1,210.5 317.9,217.4 333.7,226 357.7,239 385.7,254.1 310.6,307 282.6,291.8 258.3,278.6 
				242.7,270.1 229.8,263.2"
              ></polygon>
            </g>
          </g>
          <g id="232" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#eba5a5"
                points="211.6,285.4 210.3,276.8 223.3,283.7 224.5,292.3"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="223,283.9 224.1,291.8 211.9,285.2 210.7,277.3"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="223.8,292 222.6,283.4 238.8,292.2 240.1,300.7"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="238.5,292.4 239.7,300.2 224.1,291.8 223,283.9"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="239.4,300.4 238.1,291.9 263.4,305.4 264.6,313.9"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="263.1,305.6 264.2,313.4 239.7,300.2 238.5,292.4"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="263.9,313.6 262.7,305.1 291.3,320.5 292.5,329"
              ></polygon>

              <polygon
                fill="#eba5a5"
                points="291,320.7 292.1,328.5 264.2,313.4 263.1,305.6"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="290.7,320.6 308,308.8 309.2,317.2 291.9,329"
              ></polygon>

              <polygon
                fill="#f1a7a7"
                points="307.8,309.3 308.9,317.1 292.1,328.5 291,320.7"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="263,305.8 238.4,292.6 222.9,284.1 210.2,277.3 227.2,265.5 239.6,272.1 255.2,280.6 
				279.6,293.8 308.3,309.3 291,321"
              ></polygon>

              <polygon
                fill="#f3a7a7"
                points="227.2,265.8 239.5,272.4 255.1,280.8 279.5,294 307.8,309.3 291,320.7 263.1,305.6 238.5,292.4 
				223,283.9 210.7,277.3"
              ></polygon>
            </g>
          </g>
          <g id="PENB" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon
                fill="#bbede5"
                points="384.8,356 461.9,301.9 463.2,310.3 386,364.4"
              ></polygon>

              <polygon
                fill="#bbede5"
                points="461.7,302.4 462.9,310.2 386.2,363.9 385.1,356.1"
              ></polygon>

              <polygon
                fill="#b9e7df"
                points="333.4,335.6 332.1,327.1 385.4,355.9 386.6,364.4"
              ></polygon>

              <polygon
                fill="#b9e7df"
                points="385.1,356.1 386.2,363.9 333.7,335.4 332.5,327.6"
              ></polygon>

              <polygon
                fill="#bdede5"
                points="332,327.6 409.2,273.6 462.2,302.4 385.1,356.4"
              ></polygon>

              <polygon
                fill="#bdede5"
                points="409.2,273.9 461.7,302.4 385.1,356.1 332.5,327.6"
              ></polygon>
            </g>
          </g>
          <g id="PENB_VIP" className="" style={{ cursor: "pointer" }}>
            <g>
              <path
                fill="#f59ee3"
                d="M368.2,396.9l-1.3-8.4l0.1-0.1c11.3-8,22.8-16,33.9-23.8l0.4-0.3l0.1,0.4l1.2,8l-0.1,0.1
				c-11.1,7.8-22.6,15.8-33.9,23.8L368.2,396.9z M367.5,388.7l1.1,7.2c11.1-7.9,22.4-15.8,33.4-23.4l-1.1-7.2
				C389.9,372.9,378.6,380.9,367.5,388.7z"
              ></path>

              <path
                fill="#f59ee3"
                d="M401.1,364.8l1.2,7.8c-11.3,7.9-22.6,15.8-33.9,23.8l-1.2-7.8C378.5,380.6,389.8,372.7,401.1,364.8"
              ></path>

              <path
                fill="#f09dde"
                d="M368.8,396.8l-0.5-0.3c-11.5-6.1-23.1-12.2-34.7-18.3c-11.6-6.1-23.1-12.2-34.7-18.3l-0.1-0.1l-1.3-8.5
				l0.5,0.3c22.6,11.9,46,24.3,69.4,36.6l0.1,0.1L368.8,396.8z M299.3,359.5c11.5,6.1,23,12.2,34.6,18.2c11.4,6,22.8,12,34.2,18
				l-1.1-7.1c-23.2-12.2-46.4-24.4-68.8-36.3L299.3,359.5z"
              ></path>

              <path
                fill="#f09dde"
                d="M367.2,388.5l1.2,7.8c-23.1-12.2-46.3-24.4-69.4-36.6l-1.2-7.8C320.9,364.1,344,376.3,367.2,388.5"
              ></path>

              <path
                fill="#f89fe5"
                d="M367.1,388.8c-11.5-6.1-23.1-12.2-34.7-18.3s-23.1-12.2-34.7-18.3l-0.4-0.2l0.4-0.3
				c3.9-2.7,7.8-5.4,11.6-8.1s7.8-5.5,11.7-8.2c3.8-2.6,7.7-5.3,11.4-8l0.1-0.1l0.2,0.1l69,37.3l-0.4,0.3
				c-11.1,7.8-22.6,15.8-33.9,23.8l-0.1,0.1L367.1,388.8z"
              ></path>

              <path
                fill="#f89fe5"
                d="M332.5,327.6l68.6,37.1c-11.3,7.9-22.6,15.8-33.9,23.8c-23.1-12.2-46.3-24.4-69.4-36.6
				c7.8-5.4,15.5-10.9,23.3-16.3C324.9,333,328.7,330.3,332.5,327.6z"
              ></path>
            </g>
          </g>
          <g id="233" fill="#eba5a5" className="" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="170.7,313.9 169.4,305.4 182.7,312.5 184,321"></polygon>

              <polygon points="182.4,312.7 183.6,320.5 171,313.7 169.8,305.9"></polygon>

              <polygon points="183.3,320.7 182,312.2 250.7,349.3 251.9,357.8"></polygon>

              <polygon points="250.4,349.5 251.5,357.3 183.6,320.5 182.4,312.7"></polygon>

              <polygon points="250.1,349.4 288,322.8 289.2,331.2 251.3,357.8"></polygon>

              <polygon points="287.8,323.3 288.9,331.1 251.5,357.3 250.4,349.5"></polygon>
              <polygon points="182.3,312.9 169.3,305.9 207.2,279.4 219.9,286.3 288.3,323.3 250.4,349.8"></polygon>
              <polygon points="207.2,279.7 219.8,286.5 287.8,323.3 250.4,349.5 182.4,312.7 169.8,305.9"></polygon>
            </g>
          </g>
          <g id="208" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="575.5,572.4 607.9,549.7 609.2,558.2 576.7,580.8"></polygon>
              <polygon points="607.7,550.1 608.9,558 576.9,580.3 575.8,572.5"></polygon>
              <polygon points="495.9,536.8 494.6,528.3 576.1,572.4 577.3,580.9"></polygon>
              <polygon points="575.8,572.5 576.9,580.3 496.2,536.6 495,528.8"></polygon>
              <polygon points="494.5,528.9 527,506.1 608.2,550.1 575.8,572.9"></polygon>
              <polygon points="527,506.5 607.7,550.1 575.8,572.5 495,528.8"></polygon>
            </g>
          </g>
          <g id="234" fill="#eba5a5" style={{ cursor: "pointer" }}>
            <g>
              <polygon points="211.5,378.2 247.3,353.2 248.6,361.6 212.8,386.6"></polygon>

              <polygon points="247.1,353.6 248.3,361.4 213,386.1 211.8,378.3"></polygon>

              <polygon points="132.2,342.7 130.9,334.1 212.1,378.2 213.4,386.7"></polygon>

              <polygon points="211.8,378.3 213,386.1 132.5,342.5 131.3,334.6"></polygon>
              <polygon points="130.8,334.7 166.6,309.6 247.6,353.6 211.8,378.7"></polygon>
              <polygon points="166.6,309.9 247.1,353.6 211.8,378.3 131.3,334.6"></polygon>
            </g>
          </g>
        </g>
        <g fill="#808080">
          <g>
            <polygon points="678.2,286.8 711.2,263.7 712.4,272.2 679.5,295.3 		"></polygon>
          </g>
          <g>
            <polygon points="711,264.2 712.1,272.1 679.7,294.8 678.5,286.9 		"></polygon>
          </g>
          <g>
            <polygon points="577.7,232.6 610.6,209.6 711.5,264.2 678.5,287.2 		"></polygon>
          </g>
          <g>
            <polygon points="610.6,209.9 711,264.2 678.5,286.9 578.2,232.6 		"></polygon>
          </g>
          <g>
            <polygon points="579,240.6 577.8,232.1 678.8,286.7 680.1,295.3 		"></polygon>
          </g>
          <g>
            <polygon points="678.5,286.9 679.7,294.8 579.3,240.4 578.2,232.6 		"></polygon>
          </g>
        </g>
        <g>
          <g>
            <g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <defs>
                            <path
                              id="SVGID_1_"
                              d="M533.2,354l1.2,7.8c-0.9-6.2-5.2-12-12.9-16.2c-17.7-9.6-46.9-7.1-65,5.6
											c-10.1,7.1-14.8,15.9-13.6,24.2l-1.2-7.8c-1.2-8.2,3.5-17.1,13.6-24.2c18.1-12.7,47.3-15.2,65-5.6
											C528,342,532.3,347.8,533.2,354z"
                            ></path>
                          </defs>
                          <clipPath id="SVGID_00000058567946237645703580000004990324671282106004_">
                            <use xlinkHref="#SVGID_1_" overflow="visible"></use>
                          </clipPath>
                          <g clipPath="url(#SVGID_00000058567946237645703580000004990324671282106004_)">
                            <path
                              fill="#201C1D"
                              d="M533.2,354l1.2,7.8c-0.9-6.2-5.2-12-12.9-16.2c-3.6-1.9-7.6-3.4-11.9-4.4l-1.2-7.8
											c4.3,1,8.4,2.4,11.9,4.4C528,342,532.3,347.8,533.2,354"
                            ></path>
                            <path
                              fill="#201C1D"
                              d="M508.3,333.5l1.2,7.8c-1.8-0.4-3.6-0.7-5.5-1l-1.2-7.8C504.7,332.8,506.6,333.1,508.3,333.5"
                            ></path>
                            <path
                              fill="#201C1D"
                              d="M502.8,332.5l1.2,7.8c-1.6-0.2-3.1-0.3-4.7-0.4l-1.2-7.8C499.7,332.2,501.3,332.3,502.8,332.5"
                            ></path>
                            <path
                              fill="#201C1D"
                              d="M498.1,332.1l1.2,7.8c-1.4-0.1-2.9-0.1-4.3-0.1l-1.2-7.8C495.2,332,496.7,332,498.1,332.1"
                            ></path>
                            <path
                              fill="#201D1D"
                              d="M493.8,332l1.2,7.8c-1.4,0-2.8,0.1-4.2,0.1l-1.2-7.8C491,332,492.4,332,493.8,332"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M489.6,332.1l1.2,7.8c-1.4,0.1-2.7,0.2-4.1,0.4l-1.2-7.8C486.8,332.3,488.2,332.2,489.6,332.1"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M485.5,332.5l1.2,7.8c-1.4,0.2-2.8,0.4-4.1,0.6l-1.2-7.8C482.7,332.9,484.1,332.7,485.5,332.5"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M481.3,333.1l1.2,7.8c-1.4,0.2-2.8,0.5-4.2,0.9l-1.2-7.8C478.5,333.6,479.9,333.4,481.3,333.1"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M477.1,334l1.2,7.8c-1.5,0.4-3.1,0.8-4.6,1.2l-1.2-7.8C474,334.7,475.6,334.3,477.1,334"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M472.5,335.2l1.2,7.8c-1.7,0.5-3.4,1.1-5.1,1.8l-1.2-7.8C469.1,336.3,470.8,335.7,472.5,335.2"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M467.5,337l1.2,7.8c-2.5,1-4.8,2.1-7.1,3.3l-1.2-7.8C462.6,339,465,337.9,467.5,337"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M460.4,340.2l1.2,7.8c-1.8,1-3.5,2-5.1,3.2c-2.2,1.5-4.1,3.1-5.8,4.8l-1.2-7.8
											c1.7-1.7,3.6-3.3,5.8-4.8C456.9,342.3,458.6,341.2,460.4,340.2"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M449.5,348.2l1.2,7.8c-1.6,1.6-2.9,3.2-4,4.8l-1.2-7.8C446.6,351.3,448,349.7,449.5,348.2"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M445.5,353l1.2,7.8c-0.8,1.1-1.4,2.3-2,3.4l-1.2-7.8C444.1,355.2,444.8,354.1,445.5,353"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M443.5,356.4l1.2,7.8c-0.5,1-0.9,1.9-1.2,2.9l-1.2-7.8C442.7,358.3,443.1,357.3,443.5,356.4"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M442.4,359.3l1.2,7.8c-0.3,0.9-0.5,1.8-0.7,2.7l-1.2-7.8C441.9,361.1,442.1,360.2,442.4,359.3"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M441.7,362l1.2,7.8c-0.1,0.9-0.2,1.7-0.2,2.6l-1.2-7.8C441.5,363.7,441.6,362.9,441.7,362"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M441.5,364.6l1.2,7.8c0,0.8,0,1.7,0.1,2.5l-1.2-7.8C441.5,366.2,441.5,365.4,441.5,364.6"
                            ></path>
                            <path
                              fill="#201D1D"
                              d="M441.6,367.1l1.2,7.8c0,0.2,0,0.3,0.1,0.5l-1.2-7.8C441.6,367.4,441.6,367.2,441.6,367.1"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <defs>
                            <path
                              id="SVGID_00000090978739124075484460000008606842839586095547_"
                              d="M447.6,385.2c-2.6-3.1-4.2-6.4-4.7-9.8l-1.2-7.8
											c0.5,3.4,2.1,6.8,4.7,9.8C446.7,379.7,447.2,382.9,447.6,385.2z"
                            ></path>
                          </defs>
                          <clipPath id="SVGID_00000065033417550315786580000015551270849689670535_">
                            <use
                              xlinkHref="#SVGID_00000090978739124075484460000008606842839586095547_"
                              overflow="visible"
                            ></use>
                          </clipPath>
                          <g clipPath="url(#SVGID_00000065033417550315786580000015551270849689670535_)">
                            <path
                              fill="#E7E7E7"
                              d="M446.4,377.4l1.2,7.8c-2.6-3.1-4.2-6.4-4.7-9.8l-1.2-7.8C442.2,371,443.8,374.3,446.4,377.4"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <defs>
                            <path
                              id="SVGID_00000172440868956707726590000007193606963469880972_"
                              d="M441.8,375.5l-1.2-7.8c0.5,3.4,2,6.7,4.5,9.7
											l1.2,7.8C443.8,382.2,442.3,378.9,441.8,375.5z"
                            ></path>
                          </defs>
                          <clipPath id="SVGID_00000103944393193597217140000018371684453762602669_">
                            <use
                              xlinkHref="#SVGID_00000172440868956707726590000007193606963469880972_"
                              overflow="visible"
                            ></use>
                          </clipPath>
                          <g clipPath="url(#SVGID_00000103944393193597217140000018371684453762602669_)">
                            <path
                              fill="#201C1D"
                              d="M445.2,377.4l1.2,7.8c-2.5-3-4-6.3-4.5-9.7l-1.2-7.8C441.2,371.1,442.7,374.4,445.2,377.4"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <polygon
                  fill="#221E1F"
                  points="263.5,372.4 264.6,380.2 195.4,428.7 194.2,420.9	"
                ></polygon>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <defs>
                            <path
                              id="SVGID_00000111178909140485769530000005603072922096486556_"
                              d="M520.8,386c-13.6,9.5-33.5,13.6-50.9,10.4
											l-1.2-7.8c17.4,3.2,37.3-0.9,50.9-10.4c10.2-7.2,14.8-16.1,13.6-24.2l1.2,7.8C535.6,370,531,378.9,520.8,386z"
                            ></path>
                          </defs>
                          <clipPath id="SVGID_00000084513198504360911720000000551104473536250774_">
                            <use
                              xlinkHref="#SVGID_00000111178909140485769530000005603072922096486556_"
                              overflow="visible"
                            ></use>
                          </clipPath>
                          <g clipPath="url(#SVGID_00000084513198504360911720000000551104473536250774_)">
                            <path
                              fill="#EBEBEB"
                              d="M533.2,354l1.2,7.8c0,0.2,0,0.3,0.1,0.5l-1.2-7.8C533.3,354.3,533.2,354.2,533.2,354"
                            ></path>
                            <path
                              fill="#ECECEC"
                              d="M533.3,354.5l1.2,7.8c0.1,0.8,0.1,1.7,0.1,2.5l-1.2-7.8C533.4,356.2,533.4,355.4,533.3,354.5"
                            ></path>
                            <path
                              fill="#EDEDED"
                              d="M533.4,357.1l1.2,7.8c0,0.9-0.1,1.7-0.3,2.6l-1.2-7.8C533.3,358.8,533.4,357.9,533.4,357.1"
                            ></path>
                            <path
                              fill="#EEEEEE"
                              d="M533.1,359.7l1.2,7.8c-0.2,0.9-0.4,1.8-0.7,2.7l-1.2-7.8C532.8,361.5,533,360.6,533.1,359.7"
                            ></path>
                            <path
                              fill="#EFEFEF"
                              d="M532.5,362.4l1.2,7.8c-0.3,1-0.7,2-1.2,2.9l-1.2-7.8C531.8,364.3,532.2,363.4,532.5,362.4"
                            ></path>
                            <path
                              fill="#F0F0F0"
                              d="M531.3,365.3l1.2,7.8c-0.6,1.1-1.2,2.3-2,3.4l-1.2-7.8C530.1,367.6,530.8,366.5,531.3,365.3"
                            ></path>
                            <path
                              fill="#F1F1F1"
                              d="M529.3,368.7l1.2,7.8c-1.1,1.6-2.5,3.3-4,4.8l-1.2-7.8C526.9,372,528.2,370.4,529.3,368.7"
                            ></path>
                            <path
                              fill="#F2F2F2"
                              d="M525.3,373.6l1.2,7.8c-1.6,1.6-3.5,3.2-5.7,4.7c-1.6,1.1-3.4,2.2-5.2,3.2l-1.2-7.8
											c1.8-1,3.5-2.1,5.2-3.2C521.8,376.7,523.6,375.2,525.3,373.6"
                            ></path>
                            <path
                              fill="#F1F1F1"
                              d="M514.4,381.4l1.2,7.8c-2.2,1.2-4.6,2.3-7.1,3.3l-1.2-7.8C509.8,383.8,512.2,382.7,514.4,381.4"
                            ></path>
                            <path
                              fill="#F0F0F0"
                              d="M507.4,384.7l1.2,7.8c-1.7,0.7-3.4,1.2-5.1,1.8l-1.2-7.8C504,386,505.7,385.4,507.4,384.7"
                            ></path>
                            <path
                              fill="#EFEFEF"
                              d="M502.2,386.5l1.2,7.8c-1.5,0.4-3,0.9-4.5,1.2l-1.2-7.8C499.3,387.3,500.8,386.9,502.2,386.5"
                            ></path>
                            <path
                              fill="#EEEEEE"
                              d="M497.7,387.7l1.2,7.8c-1.4,0.3-2.8,0.6-4.2,0.9l-1.2-7.8C495,388.3,496.4,388,497.7,387.7"
                            ></path>
                            <path
                              fill="#EDEDED"
                              d="M493.6,388.6l1.2,7.8c-1.3,0.2-2.7,0.4-4.1,0.6l-1.2-7.8C490.9,389,492.2,388.8,493.6,388.6"
                            ></path>
                            <path
                              fill="#ECECEC"
                              d="M489.5,389.2l1.2,7.8c-1.3,0.2-2.7,0.3-4,0.4l-1.2-7.8C486.8,389.4,488.2,389.3,489.5,389.2"
                            ></path>
                            <path
                              fill="#EBEBEB"
                              d="M485.5,389.5l1.2,7.8c-1.4,0.1-2.7,0.1-4.1,0.1l-1.2-7.8C482.7,389.7,484.1,389.6,485.5,389.5"
                            ></path>
                            <path
                              fill="#EAEAEA"
                              d="M481.4,389.7l1.2,7.8c-1.4,0-2.9,0-4.3-0.1l-1.2-7.8C478.5,389.6,479.9,389.7,481.4,389.7"
                            ></path>
                            <path
                              fill="#E9E9E9"
                              d="M477,389.6l1.2,7.8c-1.6-0.1-3.2-0.2-4.8-0.4l-1.2-7.8C473.8,389.3,475.4,389.5,477,389.6"
                            ></path>
                            <path
                              fill="#E8E8E8"
                              d="M472.3,389.1l1.2,7.8c-1.2-0.2-2.4-0.3-3.5-0.5l-1.2-7.8C469.9,388.8,471.1,389,472.3,389.1"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <g>
                          <defs>
                            <path
                              id="SVGID_00000145026521626970143540000004937019815133194942_"
                              d="M534.2,353.8l1.2,7.8
											c1.2,8.3-3.4,17.4-13.9,24.8c-13.8,9.6-34,13.8-51.7,10.6l-1.2-7.8c17.7,3.2,37.9-1,51.7-10.6
											C530.8,371.3,535.4,362.2,534.2,353.8z"
                            ></path>
                          </defs>
                          <clipPath id="SVGID_00000163059702086386783550000009149427742027882653_">
                            <use
                              xlinkHref="#SVGID_00000145026521626970143540000004937019815133194942_"
                              overflow="visible"
                            ></use>
                          </clipPath>
                          <g clipPath="url(#SVGID_00000163059702086386783550000009149427742027882653_)">
                            <path
                              fill="#201D1D"
                              d="M534.2,353.8l1.2,7.8c0,0.2,0.1,0.4,0.1,0.5l-1.2-7.8C534.2,354.2,534.2,354,534.2,353.8"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M534.3,354.4l1.2,7.8c0.1,0.9,0.1,1.7,0.1,2.6l-1.2-7.8C534.4,356.1,534.4,355.2,534.3,354.4"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M534.4,357l1.2,7.8c0,0.9-0.1,1.8-0.3,2.7l-1.2-7.8C534.3,358.7,534.4,357.9,534.4,357"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M534.1,359.6l1.2,7.8c-0.2,0.9-0.4,1.9-0.7,2.8l-1.2-7.8C533.7,361.5,534,360.6,534.1,359.6"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M533.4,362.4l1.2,7.8c-0.3,1-0.7,2-1.2,3l-1.2-7.8C532.7,364.4,533.1,363.4,533.4,362.4"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M532.3,365.4l1.2,7.8c-0.6,1.2-1.2,2.3-2,3.5l-1.2-7.8C531,367.7,531.7,366.6,532.3,365.4"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M530.2,368.9l1.2,7.8c-1.1,1.7-2.5,3.3-4.1,4.9l-1.2-7.8C527.7,372.2,529.1,370.6,530.2,368.9"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M526.1,373.8l1.2,7.8c-1.7,1.7-3.6,3.3-5.8,4.8c-1.7,1.2-3.4,2.3-5.3,3.3l-1.2-7.8
											c1.9-1,3.6-2.1,5.3-3.3C522.5,377.1,524.4,375.5,526.1,373.8"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M515,381.9l1.2,7.8c-2.3,1.3-4.7,2.4-7.2,3.4l-1.2-7.8C510.3,384.3,512.7,383.1,515,381.9"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M507.8,385.2l1.2,7.8c-1.7,0.7-3.5,1.3-5.2,1.8l-1.2-7.8C504.3,386.5,506.1,385.9,507.8,385.2"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M502.6,387l1.2,7.8c-1.5,0.5-3,0.9-4.6,1.2l-1.2-7.8C499.5,387.9,501,387.5,502.6,387"
                            ></path>
                            <path
                              fill="#211D1E"
                              d="M498,388.3l1.2,7.8c-1.4,0.3-2.8,0.6-4.3,0.9l-1.2-7.8C495.1,388.9,496.6,388.6,498,388.3"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M493.7,389.2l1.2,7.8c-1.4,0.2-2.8,0.4-4.1,0.6l-1.2-7.8C490.9,389.6,492.3,389.4,493.7,389.2"
                            ></path>
                            <path
                              fill="#201D1E"
                              d="M489.5,389.8l1.2,7.8c-1.4,0.2-2.7,0.3-4.1,0.4l-1.2-7.8C486.8,390.1,488.2,389.9,489.5,389.8"
                            ></path>
                            <path
                              fill="#201D1D"
                              d="M485.4,390.1l1.2,7.8c-1.4,0.1-2.8,0.1-4.2,0.1l-1.2-7.8C482.6,390.3,484,390.2,485.4,390.1"
                            ></path>
                            <path
                              fill="#201C1D"
                              d="M481.2,390.3l1.2,7.8c-1.5,0-2.9,0-4.4-0.1l-1.2-7.8C478.3,390.3,479.7,390.3,481.2,390.3"
                            ></path>
                            <path
                              fill="#201C1D"
                              d="M476.8,390.2l1.2,7.8c-1.6-0.1-3.3-0.2-4.9-0.4l-1.2-7.8C473.5,389.9,475.2,390.1,476.8,390.2"
                            ></path>
                            <path
                              fill="#201C1D"
                              d="M471.9,389.7l1.2,7.8c-1.1-0.1-2.2-0.3-3.3-0.5l-1.2-7.8C469.7,389.4,470.8,389.6,471.9,389.7"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <polygon
                  fill="#221E1F"
                  points="446.2,377.2 447.4,385 371.8,438.2 370.7,430.4	"
                ></polygon>
              </g>
              <g>
                <polygon
                  fill="#201C1D"
                  points="370.7,430.4 371.8,438.2 264.6,380.2 263.5,372.4	"
                ></polygon>
              </g>
              <g>
                <polygon
                  fill="#F5F5F5"
                  points="468.7,388.6 469.9,396.4 393.2,449.8 392.1,442	"
                ></polygon>
              </g>
              <g>
                <polygon
                  fill="#221E1F"
                  points="468.6,389.2 469.8,397.1 394.6,449.7 393.5,441.9	"
                ></polygon>
              </g>
              <g>
                <polygon
                  fill="#201C1D"
                  points="498.9,499.8 500,507.6 393.2,449.8 392.1,442	"
                ></polygon>
              </g>
              <g>
                <polygon
                  fill="#F5F5F5"
                  points="498.9,499.8 500,507.6 430.8,556.1 429.6,548.3	"
                ></polygon>
              </g>
              <g>
                <polygon
                  fill="#E6E6E6"
                  points="429.6,548.3 430.8,556.1 195.4,428.7 194.2,420.9	"
                ></polygon>
              </g>
              <g>
                <path
                  fill="#F7F7F7"
                  d="M263.5,372.4l107.2,58l75.7-53c-9-10.5-5.3-24,8.9-34c18.1-12.7,47.3-15.2,65-5.6
					c17.7,9.6,17.4,27.7-0.7,40.4c-13.6,9.5-33.5,13.6-50.9,10.4L392.1,442l106.8,57.8l-69.3,48.5L194.2,420.9L263.5,372.4z"
                ></path>
              </g>
              <g>
                <path
                  fill="#221E1F"
                  d="M454.6,343c18.5-13,48.3-15.5,66.4-5.7c18.1,9.8,17.8,28.3-0.7,41.3c-13.8,9.6-34,13.8-51.7,10.6
					l-75.2,52.6l106.8,57.8l-70.7,49.5L192.8,421l70.7-49.5l107.2,58l74.5-52.2C436.4,366.9,440.2,353.1,454.6,343z M519.6,378.2
					c18.1-12.7,18.4-30.8,0.7-40.4s-46.9-7.1-65,5.6c-14.2,10-17.9,23.5-9.1,33.8l-75.6,53.2l-107.2-58l-69.3,48.5l235.4,127.5
					l69.3-48.5L392.1,442l76.4-53.5C486.1,391.8,506.1,387.7,519.6,378.2"
                ></path>
              </g>
              <g>
                <polygon
                  fill="#221E1F"
                  points="500.3,499.7 501.4,507.5 430.7,557 429.6,549.2	"
                ></polygon>
              </g>
              <g>
                <polygon
                  fill="#201C1D"
                  points="429.6,549.2 430.7,557 194,428.8 192.8,421	"
                ></polygon>
              </g>
            </g>
          </g>
        </g>
        <g>
          <g>
            <g>
              <polygon points="334.3,436.7 348.6,444.5 346.3,446 340.3,442.8 322.4,455.3 320,454 337.9,441.5 332,438.3"></polygon>
            </g>
            <g>
              <path
                d="M301.3,440.2l3.5-0.5c-0.4,2,0.8,3.8,2.7,4.9c2.4,1.3,5.2,1.4,7.2,0c2.2-1.6,1.1-3-0.6-5.1c-1.8-2.4-3.5-4.9,0-7.3
				c3-2.1,8-2.3,11.4-0.5c2.2,1.2,3.5,2.9,3.9,5l-3.4,0.6c-0.2-1.8-1.2-3.2-2.7-4c-1.9-1-4.5-1.2-6.5,0.2c-1.9,1.4-0.9,2.8,0.6,4.8
				c2,2.7,3.9,4.9,0.1,7.5c-3.7,2.6-8.8,2.3-12.3,0.4C302.7,444.8,301.1,442.8,301.3,440.2z"
              ></path>
            </g>
            <g>
              <path
                d="M329.9,459.4l27.6-10.1l2.4,1.3l-12.6,18.2l-2.5-1.4l3.1-4.4l-8.8-4.8l-6.7,2.5L329.9,459.4z M355.8,452.1L355.8,452.1
				l-13.7,5.1l7.3,3.9L355.8,452.1"
              ></path>
            </g>
            <g>
              <path
                d="M359.6,463c6-4.2,14.1-5.1,20.1-1.9c2.7,1.5,4.5,3.6,4.4,6.3l-3.2,0.2c0-1.9-1.2-3.5-3.5-4.8c-4.1-2.2-10.3-1.7-15.2,1.6
				c-4.6,3.2-5,7.1-0.6,9.5c2,1.1,4.3,1.7,6.9,1.7l4.3-3l-5.7-3.1l2.2-1.6l8.1,4.4l-8,5.6c-3.4,0.1-7.2-0.7-10.2-2.4
				C353.6,472.4,353.4,467.4,359.6,463z"
              ></path>
            </g>
            <g>
              <polygon
                points="391.7,467.8 403.8,474.4 401.6,475.9 391.9,470.7 385.1,475.4 393.1,479.7 390.8,481.3 382.9,477 376.2,481.7 
				386.5,487.2 384.2,488.8 371.6,481.9"
              ></polygon>
            </g>
          </g>
        </g>
        <g>
          <g>
            <g>
              <path
                d="M600.2,510c1.4-1,3.7-1.2,5.4-0.3c2.6,1.4,2.4,3.7,0.8,5.2l-1-0.2c1-1.1,1.4-2.5,0.3-3.6c-0.1,0.5-0.5,1.1-1.2,1.6
				c-1.3,0.9-3.1,1.1-4.5,0.4C598.7,512.3,598.8,511,600.2,510z M604.7,510.4L604.7,510.4c-1.2-0.7-2.7-0.6-3.6,0.1
				c-1,0.7-1,1.5-0.1,2s2,0.4,3-0.3C604.6,511.6,604.9,510.9,604.7,510.4"
              ></path>
            </g>
            <g>
              <path
                d="M593.9,514.5c1.6-1.1,4-1.2,6.4,0.1c2.1,1.1,2.6,2.7,0.9,3.9c-1.6,1.1-4,1.2-6.4,0C592.7,517.2,592.2,515.7,593.9,514.5z
				 M600.3,518c1.2-0.8,0.7-1.9-1-2.8c-1.8-1-3.6-1-4.7-0.3c-1.2,0.8-0.7,1.9,1,2.8C597.5,518.7,599.3,518.7,600.3,518"
              ></path>
            </g>
            <g>
              <path
                d="M587.8,518.7c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C586.5,520.4,586.7,519.5,587.8,518.7z"
              ></path>
            </g>
            <g>
              <path
                d="M628,490.6c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C626.7,492.2,626.9,491.4,628,490.6z"
              ></path>
            </g>
            <g>
              <path
                d="M638.1,483.5c1.6-1.1,4-1.2,6.4,0.1c2.1,1.1,2.6,2.7,0.9,3.9c-1.6,1.1-4,1.2-6.4,0C636.9,486.3,636.3,484.7,638.1,483.5z
				 M644.5,487c1.2-0.8,0.7-1.9-1-2.8c-1.8-1-3.6-1-4.6-0.3c-1.2,0.8-0.7,1.9,1,2.8C641.7,487.7,643.5,487.8,644.5,487"
              ></path>
            </g>
            <g>
              <polygon points="633.9,486.5 641,490.4 640.1,491 634,487.7 633.7,489.3 632.6,489.3 633.1,487.1"></polygon>
            </g>
            <g>
              <polygon points="676.2,456.9 683.4,460.7 682.5,461.4 676.4,458.1 676,459.7 674.9,459.6 675.5,457.4"></polygon>
            </g>
            <g>
              <polygon points="680.2,454.1 687.3,458 686.4,458.6 680.4,455.3 680,456.9 678.9,456.8 679.5,454.6"></polygon>
            </g>
            <g>
              <path
                d="M670.4,460.9c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C669.1,462.5,669.3,461.7,670.4,460.9z"
              ></path>
            </g>
            <g>
              <path
                d="M719.3,426.6c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C718,428.2,718.2,427.4,719.3,426.6z"
              ></path>
            </g>
            <g>
              <polygon points="715.8,429.2 722.9,433.1 722,433.7 715.9,430.4 715.6,432 714.5,431.9 715,429.7"></polygon>
            </g>
            <g>
              <path
                d="M709.9,433.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C708.6,434.8,708.8,434,709.9,433.2z"
              ></path>
            </g>
            <g>
              <path
                d="M758.5,399.2c1.2-0.9,2.9-1.2,4.1-0.6c0.7,0.4,0.9,1,0.5,1.6l0,0c1.1-0.4,2.2-0.4,3.1,0.1c1.2,0.6,1,1.8-0.4,2.7
				c-1.2,0.9-2.7,1.2-3.9,1l0.4-0.7c0.8,0.1,1.7-0.1,2.6-0.6c0.8-0.6,1-1.3,0.2-1.8c-0.7-0.4-1.8-0.3-2.9,0.4l-0.6,0.4l-0.8-0.4
				l0.7-0.5c0.9-0.7,0.7-1.2,0.2-1.5c-0.7-0.4-1.8-0.2-2.5,0.3s-0.8,1-0.7,1.4l-1.1,0.3C757.1,400.7,757.4,400,758.5,399.2z"
              ></path>
            </g>
            <g>
              <polygon points="754.9,401.8 762,405.7 761.1,406.3 755,403 754.7,404.6 753.6,404.6 754.1,402.3"></polygon>
            </g>
            <g>
              <path
                d="M749,405.8c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6L748,408C747.7,407.4,747.9,406.6,749,405.8z"
              ></path>
            </g>
            <g>
              <path
                d="M789.6,377.4c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C788.3,379,788.5,378.2,789.6,377.4z"
              ></path>
            </g>
            <g>
              <polygon points="795.4,373.4 802.6,377.3 801.7,377.9 795.6,374.6 795.2,376.2 794.1,376.2 794.7,373.9"></polygon>
            </g>
            <g>
              <path
                d="M806.1,372.3l1.1-0.7l0.8,0.4l-1.1,0.7l1.3,0.7l-0.9,0.6l-1.3-0.7l-3.4,2.4l-0.6-0.3l-1.7-5.3l0.8-0.5L806.1,372.3z
				 M805.2,372.9l-3.6-2l1.2,3.6L805.2,372.9"
              ></path>
            </g>
            <g>
              <polygon points="831.5,348.2 838.6,352 837.7,352.7 831.6,349.4 831.3,351 830.2,350.9 830.7,348.7"></polygon>
            </g>
            <g>
              <path
                d="M837.4,344l0.8,0.4l-3,2.1l1.9,1.2c0.2-0.3,0.6-0.7,0.9-0.9c1.3-0.9,3.2-1.2,4.6-0.4c1.4,0.7,1.3,2-0.2,3
				c-1,0.7-2.4,1.1-3.6,1.1l0.2-0.7c0.9,0,1.8-0.2,2.6-0.7c1-0.7,1.1-1.5,0.2-2c-1-0.5-2.3-0.3-3.2,0.4c-0.5,0.3-0.8,0.7-0.9,1.1
				l-0.7,0.3l-3.4-2.1L837.4,344z"
              ></path>
            </g>
            <g>
              <path
                d="M825.6,352.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C824.3,353.8,824.5,353,825.6,352.2z"
              ></path>
            </g>
            <g>
              <g>
                <path
                  d="M864.4,316.2c1.3-0.9,3.1-1.1,4.5-0.4c1.3,0.7,1.2,2-0.2,3s-3.7,1.2-5.4,0.3c-2.5-1.4-2.5-3.6-0.9-5.1l1,0.2
					c-1,1.1-1.3,2.4-0.2,3.6C863.3,317.2,863.7,316.6,864.4,316.2z M867.9,318.3c1-0.7,0.9-1.5,0.1-1.9c-0.9-0.5-2.1-0.4-3,0.3
					c-0.8,0.6-0.9,1.2-0.7,1.8h0.1C865.4,319.1,866.9,319,867.9,318.3"
                ></path>
              </g>
              <g>
                <polygon points="857.4,317.8 864.5,321.6 863.6,322.2 857.5,318.9 857.2,320.6 856.1,320.5 856.6,318.3	"></polygon>
              </g>
              <g>
                <path
                  d="M851.5,321.8c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
					c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C850.2,323.4,850.4,322.6,851.5,321.8z"
                ></path>
              </g>
            </g>
            <g>
              <path
                d="M863.1,241.8c1.1-0.4,2.3-0.5,3.3,0.1c1.2,0.7,0.9,1.9-0.5,2.9c-1.5,1.1-3.4,1.3-4.6,0.7c-1-0.5-1.1-1.3-0.5-2
				c-0.7,0.2-1.8,0.3-2.6-0.1c-1.1-0.6-0.9-1.7,0.4-2.5c1.3-0.9,2.9-1.2,4-0.6C863.4,240.6,863.4,241.3,863.1,241.8z M865.1,244.3
				c1-0.7,1-1.5,0.3-1.9c-0.8-0.4-2-0.3-3,0.4s-1.1,1.4-0.3,1.9C862.9,245.1,864.2,244.9,865.1,244.3 M859.2,242.7
				c0.7,0.4,1.6,0.2,2.4-0.4c0.8-0.6,0.9-1.2,0.3-1.5c-0.7-0.4-1.7-0.2-2.5,0.3C858.6,241.8,858.5,242.4,859.2,242.7"
              ></path>
            </g>
            <g>
              <polygon points="854.7,243.6 861.8,247.5 860.9,248.1 854.9,244.8 854.5,246.4 853.4,246.3 853.9,244.1"></polygon>
            </g>
            <g>
              <path
                d="M848.8,247.6c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C847.5,249.2,847.7,248.4,848.8,247.6z"
              ></path>
            </g>
            <g>
              <path
                d="M826.6,218.8c1.4-1,3.7-1.2,5.4-0.3c2.6,1.4,2.4,3.7,0.8,5.2l-1-0.2c1-1.1,1.4-2.5,0.3-3.6c-0.1,0.5-0.5,1.1-1.2,1.6
				c-1.3,0.9-3.1,1.1-4.5,0.4C825,221.1,825.1,219.8,826.6,218.8z M831.1,219.2L831.1,219.2c-1.2-0.7-2.7-0.6-3.6,0.1
				c-1,0.7-1,1.5-0.1,2s2,0.4,3-0.3C831,220.4,831.3,219.7,831.1,219.2"
              ></path>
            </g>
            <g>
              <polygon points="822.7,221.6 829.8,225.5 828.9,226.1 822.8,222.8 822.5,224.4 821.4,224.4 821.9,222.2"></polygon>
            </g>
            <g>
              <path
                d="M816.8,225.7c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C815.5,227.3,815.7,226.5,816.8,225.7z"
              ></path>
            </g>
            <g>
              <path
                d="M782.6,199.8c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C781.3,201.5,781.5,200.6,782.6,199.8z"
              ></path>
            </g>
            <g>
              <path
                d="M777.1,203.7c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C775.8,205.3,776,204.5,777.1,203.7z"
              ></path>
            </g>
            <g>
              <path
                d="M788.7,195.6c1.6-1.1,4-1.2,6.4,0.1c2.1,1.1,2.6,2.7,0.9,3.9c-1.6,1.1-4,1.2-6.4,0C787.5,198.3,787,196.8,788.7,195.6z
				 M795.1,199.1c1.2-0.8,0.7-1.9-1-2.8c-1.8-1-3.6-1-4.6-0.3c-1.2,0.8-0.7,1.9,1,2.8C792.3,199.8,794.1,199.8,795.1,199.1"
              ></path>
            </g>
            <g>
              <path
                d="M705.4,151.7c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C704.1,153.4,704.3,152.5,705.4,151.7z"
              ></path>
            </g>
            <g>
              <path
                d="M699.9,155.6c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C698.6,157.2,698.8,156.4,699.9,155.6z"
              ></path>
            </g>
            <g>
              <path
                d="M694.5,159.4c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C693.2,161,693.3,160.2,694.5,159.4z"
              ></path>
            </g>
            <g>
              <path
                d="M657.6,139.5c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C656.3,141.1,656.5,140.3,657.6,139.5z"
              ></path>
            </g>
            <g>
              <path
                d="M668.6,131.8c1.2-0.9,2.9-1.2,4.1-0.6c0.7,0.4,0.9,1,0.5,1.6l0,0c1.1-0.4,2.2-0.4,3,0.1c1.2,0.6,1,1.8-0.4,2.7
				c-1.2,0.9-2.7,1.2-3.9,1l0.4-0.7c0.8,0.1,1.8-0.1,2.6-0.7s1-1.3,0.2-1.7c-0.7-0.4-1.8-0.3-2.9,0.4l-0.6,0.4l-0.7-0.4l0.7-0.5
				c0.9-0.7,0.7-1.2,0.2-1.5c-0.7-0.4-1.8-0.2-2.5,0.3s-0.8,1-0.7,1.4l-1.1,0.3C667.3,133.3,667.5,132.5,668.6,131.8z"
              ></path>
            </g>
            <g>
              <path
                d="M663.1,135.6c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C661.8,137.2,662,136.4,663.1,135.6z"
              ></path>
            </g>
            <g>
              <path
                d="M615.7,117.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C614.3,118.8,614.5,118,615.7,117.2z"
              ></path>
            </g>
            <g>
              <g>
                <path
                  d="M633.7,111l1.1-0.7l0.8,0.4l-1.1,0.7l1.3,0.7l-0.9,0.6l-1.3-0.7l-3.4,2.4l-0.6-0.3l-1.7-5.3l0.8-0.5L633.7,111z
					 M632.8,111.6l-3.6-2l1.2,3.6L632.8,111.6"
                ></path>
              </g>
              <g>
                <path
                  d="M621.1,113.4c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
					c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C619.8,115,620,114.2,621.1,113.4z"
                ></path>
              </g>
            </g>
            <g>
              <path
                d="M509.4,122.1c1.3-0.9,3.1-1.1,4.5-0.4c1.3,0.7,1.2,2-0.2,3s-3.7,1.2-5.4,0.3c-2.5-1.4-2.5-3.6-0.9-5.1l1,0.2
				c-1,1.1-1.3,2.4-0.2,3.6C508.3,123.1,508.7,122.6,509.4,122.1z M513,124.2c1-0.7,0.9-1.5,0.1-1.9c-0.9-0.5-2.1-0.3-3,0.3
				c-0.8,0.6-0.9,1.2-0.7,1.8h0.1C510.5,125,512,124.9,513,124.2"
              ></path>
            </g>
            <g>
              <path
                d="M500.6,124.9c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C499.2,126.5,499.4,125.7,500.6,124.9z"
              ></path>
            </g>
            <g>
              <path
                d="M495.1,128.8c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C493.8,130.4,493.9,129.6,495.1,128.8z"
              ></path>
            </g>
            <g>
              <polygon points="465,140 465.7,140.4 469.4,146 468.4,146.5 464.9,141.2 461.3,143.6 460.5,143.2"></polygon>
            </g>
            <g>
              <path
                d="M457.4,145.3c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C456.1,146.9,456.3,146.1,457.4,145.3z"
              ></path>
            </g>
            <g>
              <path
                d="M451.9,149.1c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C450.6,150.8,450.8,149.9,451.9,149.1z"
              ></path>
            </g>
            <g>
              <path
                d="M420.6,172.3c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C419.3,173.9,419.5,173,420.6,172.3z"
              ></path>
            </g>
            <g>
              <path
                d="M415.2,176.1c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C413.8,177.7,414,176.9,415.2,176.1z"
              ></path>
            </g>
            <g>
              <path
                d="M430.9,169.2c1.1-0.4,2.3-0.5,3.3,0.1c1.2,0.7,0.9,1.9-0.5,2.9c-1.5,1.1-3.4,1.3-4.6,0.7c-1-0.5-1.1-1.3-0.5-2
				c-0.7,0.2-1.8,0.3-2.6-0.1c-1.1-0.6-0.9-1.7,0.4-2.5c1.3-0.9,2.9-1.1,4-0.6C431.2,168,431.3,168.7,430.9,169.2z M432.9,171.7
				c1-0.7,1-1.5,0.3-1.9c-0.8-0.4-2-0.3-3,0.4s-1.1,1.5-0.3,1.9C430.7,172.5,432,172.3,432.9,171.7 M427,170.1
				c0.7,0.4,1.6,0.2,2.4-0.4s0.9-1.2,0.3-1.5c-0.7-0.4-1.7-0.2-2.5,0.3C426.4,169.2,426.4,169.8,427,170.1"
              ></path>
            </g>
            <g>
              <path
                d="M380.5,200.3c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C379.2,202,379.4,201.1,380.5,200.3z"
              ></path>
            </g>
            <g>
              <path
                d="M375,204.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C373.7,205.8,373.9,205,375,204.2z"
              ></path>
            </g>
            <g>
              <path
                d="M386.3,196.2c1.4-1,3.7-1.2,5.4-0.3c2.6,1.4,2.4,3.7,0.9,5.2l-1-0.2c1-1.1,1.4-2.5,0.3-3.6c-0.1,0.5-0.5,1.1-1.2,1.6
				c-1.3,0.9-3.1,1.1-4.5,0.4C384.8,198.6,384.9,197.3,386.3,196.2z M390.8,196.6L390.8,196.6c-1.2-0.7-2.7-0.6-3.6,0.1
				c-1,0.7-1,1.5-0.1,2s2,0.4,3-0.3C390.7,197.9,391,197.2,390.8,196.6"
              ></path>
            </g>
            <g>
              <path
                fill="#FFFFFF"
                d="M304.4,200.2c1.2-0.9,2.9-1.2,4.1-0.6c0.7,0.4,0.9,1,0.5,1.6l0,0c1.1-0.4,2.2-0.4,3.1,0.1c1.2,0.6,1,1.8-0.4,2.7
				c-1.2,0.9-2.7,1.2-3.9,1l0.4-0.7c0.8,0.1,1.7-0.1,2.6-0.6c0.8-0.6,1-1.3,0.2-1.8c-0.7-0.4-1.8-0.3-2.9,0.4l-0.6,0.4l-0.7-0.4
				l0.7-0.5c0.9-0.7,0.7-1.2,0.2-1.5c-0.7-0.4-1.8-0.2-2.5,0.3s-0.8,1-0.7,1.4l-1.1,0.3C303.1,201.7,303.3,201,304.4,200.2z"
              ></path>
            </g>
            <g>
              <path
                fill="#FFFFFF"
                d="M298.9,204.1c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C297.6,205.7,297.8,204.9,298.9,204.1z"
              ></path>
            </g>
            <g>
              <path
                fill="#FFFFFF"
                d="M310.7,195.8c1.6-1.1,4-1.2,6.4,0.1c2.1,1.1,2.6,2.7,0.9,3.9c-1.6,1.1-4,1.2-6.4,0C309.4,198.6,308.9,197,310.7,195.8z
				 M317.1,199.3c1.2-0.8,0.7-1.9-1-2.8c-1.8-1-3.6-1-4.7-0.3c-1.2,0.8-0.7,1.9,1,2.8C314.3,200.1,316,200.1,317.1,199.3"
              ></path>
            </g>
            <g>
              <path
                fill="#FFFFFF"
                d="M207.2,267.1c1.2-0.9,2.9-1.2,4.1-0.6c0.7,0.4,0.9,1,0.5,1.6l0,0c1.1-0.4,2.2-0.4,3,0.1c1.2,0.6,1,1.8-0.4,2.7
				c-1.2,0.9-2.7,1.2-3.9,1l0.4-0.7c0.8,0.1,1.8-0.1,2.6-0.6c0.8-0.6,1-1.3,0.2-1.8c-0.7-0.4-1.8-0.3-2.9,0.4l-0.6,0.4l-0.8-0.4
				l0.7-0.5c0.9-0.7,0.7-1.2,0.2-1.5c-0.7-0.4-1.8-0.2-2.5,0.3s-0.8,1-0.7,1.4l-1.1,0.3C205.9,268.6,206.1,267.9,207.2,267.1z"
              ></path>
            </g>
            <g>
              <path
                fill="#FFFFFF"
                d="M201.7,271c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3V273
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C200.4,272.6,200.6,271.8,201.7,271z"
              ></path>
            </g>
            <g>
              <path
                fill="#FFFFFF"
                d="M212.8,263.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C211.5,264.8,211.7,264,212.8,263.2z"
              ></path>
            </g>
            <g>
              <path
                d="M214.5,316.6c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.4-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C213.2,318.2,213.3,317.4,214.5,316.6z"
              ></path>
            </g>
            <g>
              <path
                d="M225.6,308.8c1.2-0.9,2.9-1.2,4.1-0.6c0.7,0.4,0.9,1,0.5,1.6l0,0c1.1-0.4,2.2-0.4,3.1,0.1c1.2,0.6,1,1.8-0.4,2.7
				c-1.2,0.9-2.7,1.2-3.9,1l0.4-0.7c0.8,0.1,1.7-0.1,2.6-0.6c0.8-0.6,1-1.3,0.2-1.8c-0.7-0.4-1.8-0.3-2.9,0.4l-0.6,0.4l-0.7-0.4
				l0.7-0.5c0.9-0.7,0.7-1.2,0.2-1.5c-0.7-0.4-1.8-0.2-2.5,0.3s-0.8,1-0.7,1.4l-1.1,0.3C224.3,310.3,224.6,309.5,225.6,308.8z"
              ></path>
            </g>
            <g>
              <path
                d="M220,312.7c1.2-0.9,2.9-1.2,4.1-0.6c0.7,0.4,0.9,1,0.5,1.6l0,0c1.1-0.4,2.2-0.4,3.1,0.1c1.2,0.6,1,1.8-0.4,2.7
				c-1.2,0.9-2.7,1.2-3.9,1l0.4-0.7c0.8,0.1,1.7-0.1,2.6-0.6c0.8-0.6,1-1.3,0.2-1.8c-0.7-0.4-1.8-0.3-2.9,0.4l-0.6,0.4l-0.7-0.4
				l0.7-0.5c0.9-0.7,0.7-1.2,0.2-1.5c-0.7-0.4-1.8-0.2-2.5,0.3s-0.8,1-0.7,1.4l-1.1,0.3C218.7,314.3,218.9,313.5,220,312.7z"
              ></path>
            </g>
            <g>
              <polygon points="304.1,252.1 311.2,256 310.4,256.6 304.3,253.3 303.9,254.9 302.8,254.9 303.4,252.6"></polygon>
            </g>
            <g>
              <path
                d="M298.1,256.3c1.2-0.9,2.9-1.2,4.1-0.6c0.7,0.4,0.9,1,0.5,1.6l0,0c1.1-0.4,2.2-0.4,3.1,0.1c1.2,0.6,1,1.8-0.4,2.7
				c-1.2,0.9-2.7,1.2-3.9,1l0.4-0.7c0.8,0.1,1.7-0.1,2.6-0.6c0.8-0.6,1-1.3,0.2-1.8c-0.7-0.4-1.8-0.3-2.9,0.4l-0.6,0.4l-0.8-0.4
				l0.7-0.5c0.9-0.7,0.7-1.2,0.2-1.5c-0.7-0.4-1.8-0.2-2.5,0.3s-0.8,1-0.7,1.4l-1.1,0.3C296.8,257.8,297,257,298.1,256.3z"
              ></path>
            </g>
            <g>
              <path
                d="M292.6,260.1c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C291.3,261.7,291.5,260.9,292.6,260.1z"
              ></path>
            </g>
            <g>
              <polygon points="884.8,279.2 891.9,283 891,283.7 885,280.4 884.6,282 883.5,281.9 884.1,279.7"></polygon>
            </g>
            <g>
              <polygon points="890.5,275.1 891.1,275.5 894.9,281.1 893.8,281.6 890.3,276.3 886.8,278.7 886,278.3"></polygon>
            </g>
            <g>
              <path
                d="M879,283.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C877.6,284.8,877.8,284,879,283.2z"
              ></path>
            </g>
            <g>
              <path
                d="M565.5,98.9l0.8,0.4l-3,2.1l1.9,1.2c0.2-0.3,0.6-0.7,0.9-0.9c1.3-0.9,3.2-1.2,4.6-0.4c1.4,0.7,1.2,2-0.2,3
				c-1,0.7-2.4,1.1-3.6,1.1l0.2-0.7c0.8,0.1,1.8-0.2,2.5-0.7c1-0.7,1.1-1.5,0.2-2c-1-0.5-2.3-0.3-3.2,0.4c-0.5,0.3-0.8,0.7-0.9,1.1
				l-0.7,0.3l-3.4-2.1L565.5,98.9z"
              ></path>
            </g>
            <g>
              <g>
                <path
                  d="M557.7,104.3c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
					c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C556.4,105.9,556.5,105.1,557.7,104.3z"
                ></path>
              </g>
              <g>
                <path
                  d="M552.2,108.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.1,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
					c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C550.9,109.8,551.1,109,552.2,108.2z"
                ></path>
              </g>
            </g>
            <g>
              <path
                d="M515.6,441.3c1.1-0.8,2.6-1.3,4.3-1.6l0.2,1c-1.5,0.2-2.7,0.6-3.4,1.2c-1,0.7-1.3,1.5-0.4,2s2.2,0.1,3.9-0.6
				c2.3-0.8,4.2-1.6,6.1-0.6c1.8,1,1.2,2.6-0.6,3.9c-1.3,0.9-3,1.5-5.1,1.7l-0.1-1.1c1.6,0,3.1-0.5,4.1-1.2c1.2-0.9,1.5-1.8,0.6-2.3
				c-1.1-0.6-2.3-0.1-4.1,0.6c-2,0.7-4.2,1.5-5.9,0.5C513.7,444.1,513.9,442.5,515.6,441.3z"
              ></path>
            </g>
            <g>
              <path
                d="M533.4,429l13.7,2.7l-1.3,0.9l-3.3-0.7L538,435l1.5,1.9l-1.3,0.9l-6.1-8L533.4,429z M537.3,434.2l3.7-2.6l-6.8-1.4l0,0
				L537.3,434.2"
              ></path>
            </g>
            <g>
              <polygon points="527.6,433 528.7,433.6 525.6,435.8 534.4,440.5 533.2,441.4 524.4,436.6 521.4,438.7 520.3,438.1"></polygon>
            </g>
            <g>
              <path
                d="M578.8,397.1c1.4-1,3.2-1.7,5.4-1.8l-0.1,1c-1.6,0.1-2.9,0.6-4.1,1.5c-2.1,1.5-2.2,3.4,0.2,4.7c2.2,1.2,5.4,1.1,7.6-0.5
				c1-0.7,1.7-1.5,1.9-2.3l-2.1-1.2l-2.9,2l-1.1-0.6l4.2-2.9l3.9,2.1c-0.2,1.1-1.1,2.3-2.7,3.4c-2.9,2-7,2.5-10,0.8
				C575.9,401.7,575.7,399.2,578.8,397.1z"
              ></path>
            </g>
            <g>
              <polygon
                points="571.8,402.1 581.7,407.4 580.4,408.3 567,408 574.8,412.3 573.5,413.1 563.7,407.8 564.9,406.9 578.4,407.2 
				570.6,402.9"
              ></polygon>
            </g>
            <g>
              <polygon points="561.1,409.6 571,414.9 569.7,415.8 559.9,410.4"></polygon>
            </g>
            <g>
              <path
                d="M552.5,415.6c3.2-2.2,7.3-2.6,10.2-1s3,4-0.3,6.3l-3.1,2.1l-9.9-5.3L552.5,415.6z M561.2,420.4c2.5-1.7,2.4-3.7,0.2-4.9
				c-2.3-1.2-5.4-1-7.8,0.7l-1.8,1.3l7.7,4.2L561.2,420.4"
              ></path>
            </g>
            <g>
              <polygon
                points="547,419.4 556.9,424.8 555.6,425.7 542.2,425.4 549.9,429.6 548.7,430.5 538.8,425.2 540,424.3 553.6,424.6 
				545.7,420.3"
              ></polygon>
            </g>
            <g>
              <polygon
                points="559.9,431.1 561,431.7 556.1,435.2 559.4,437 563.4,434.1 564.5,434.7 560.5,437.6 563.8,439.3 569,435.6 
				570.1,436.2 563.6,440.8 553.7,435.4"
              ></polygon>
            </g>
            <g>
              <path
                d="M548.6,439.1c2.4-1.6,4.6-1.6,6.4-0.7c2.1,1.1,1.6,2.7-0.5,4.1l-2.1,1.5l3.8,2l-1.2,0.9l-9.9-5.3L548.6,439.1z
				 M553.3,442c1.7-1.2,1.5-2.1,0.4-2.7c-1.3-0.7-2.8-0.5-4.1,0.5l-2.2,1.5l3.9,2.1L553.3,442"
              ></path>
            </g>
            <g>
              <path
                d="M580.8,416.5l13.7,2.7l-1.3,0.9l-3.3-0.7l-4.5,3.2l1.5,1.9l-1.3,0.9l-6.1-8L580.8,416.5z M584.8,421.7l3.7-2.6l-6.8-1.4
				l0,0L584.8,421.7"
              ></path>
            </g>
            <g>
              <polygon
                points="570.3,423.8 580.2,429.2 578.9,430.1 565.5,429.8 565.5,429.8 573.3,434 572,434.9 562.2,429.5 563.4,428.7 
				576.9,429 569.1,424.7"
              ></polygon>
            </g>
            <g>
              <path
                d="M333.6,342.7c1.1-0.8,2.6-1.3,4.3-1.6l0.2,1c-1.5,0.2-2.7,0.6-3.4,1.2c-1,0.7-1.3,1.5-0.3,2c0.9,0.5,2.2,0.1,3.9-0.6
				c2.3-0.8,4.2-1.6,6.1-0.6c1.8,1,1.2,2.6-0.6,3.9c-1.3,0.9-3,1.5-5.1,1.7l-0.1-1.1c1.6,0,3.1-0.5,4.1-1.2c1.2-0.9,1.5-1.8,0.5-2.3
				c-1.1-0.6-2.3-0.1-4.1,0.6c-2,0.7-4.2,1.5-5.9,0.5C331.7,345.5,331.9,343.9,333.6,342.7z"
              ></path>
            </g>
            <g>
              <path
                d="M351.4,330.4l13.7,2.7l-1.3,0.9l-3.3-0.7l-4.5,3.2l1.5,1.9l-1.3,0.9l-6.1-8L351.4,330.4z M355.4,335.6l3.7-2.6l-6.8-1.4
				l0,0L355.4,335.6"
              ></path>
            </g>
            <g>
              <polygon points="345.6,334.5 346.7,335.1 343.6,337.2 352.4,341.9 351.2,342.8 342.4,338.1 339.4,340.2 338.3,339.6"></polygon>
            </g>
            <g>
              <polygon
                points="365,320.9 374.9,326.2 373.6,327.1 360.2,326.8 368,331.1 366.7,331.9 356.8,326.6 358.1,325.7 371.6,326 
				363.8,321.7"
              ></polygon>
            </g>
            <g>
              <polygon
                points="389.8,303.5 399.7,308.8 398.4,309.7 385,309.4 392.8,313.7 391.5,314.5 381.7,309.2 382.9,308.3 396.4,308.6 
				388.6,304.3"
              ></polygon>
            </g>
            <g>
              <polygon points="379.1,311 389,316.3 387.7,317.2 377.9,311.9"></polygon>
            </g>
            <g>
              <path
                d="M370.5,317c3.2-2.2,7.3-2.6,10.2-1c2.9,1.6,3,4-0.3,6.3l-3.1,2.1l-9.9-5.3L370.5,317z M379.3,321.8
				c2.5-1.7,2.4-3.7,0.2-4.9c-2.3-1.2-5.4-1-7.8,0.7l-1.8,1.3l7.7,4.2L379.3,321.8"
              ></path>
            </g>
            <g>
              <path
                d="M396.8,298.5c1.4-1,3.2-1.7,5.4-1.8l-0.1,1c-1.6,0.2-2.9,0.6-4.1,1.5c-2.1,1.5-2.2,3.4,0.2,4.7c2.2,1.2,5.4,1.1,7.6-0.5
				c1-0.7,1.7-1.5,1.9-2.3l-2.1-1.2l-2.9,2l-1.1-0.6l4.2-2.9l3.9,2.1c-0.2,1.1-1.1,2.3-2.7,3.4c-2.9,2-7,2.5-10,0.8
				C393.9,303.1,393.8,300.6,396.8,298.5z"
              ></path>
            </g>
            <g>
              <path
                d="M366.9,340.3c2.4-1.6,4.6-1.6,6.4-0.7c2.1,1.1,1.6,2.7-0.5,4.1l-2.1,1.4l3.8,2l-1.2,0.9l-9.9-5.3L366.9,340.3z
				 M371.6,343.2c1.7-1.2,1.6-2.1,0.4-2.7c-1.3-0.7-2.8-0.5-4.1,0.5l-2.2,1.5l3.9,2.1L371.6,343.2"
              ></path>
            </g>
            <g>
              <polygon
                points="378.2,332.3 379.3,332.9 374.4,336.4 377.7,338.2 381.7,335.3 382.8,335.9 378.8,338.8 382.1,340.5 387.3,336.9 
				388.4,337.5 381.9,342 372.1,336.6"
              ></polygon>
            </g>
            <g>
              <path
                d="M404.6,319.7c1.4-0.7,3.2-0.9,4.6-0.1c1.6,0.9,1.6,2.2-0.7,3.8l-3.7,2.6l-9.9-5.3l3.3-2.3c2-1.4,4-1.9,5.7-1
				C404.9,317.8,405.3,318.7,404.6,319.7L404.6,319.7z M407.3,322.8c1.3-0.9,1.7-1.8,0.5-2.4c-1.1-0.6-2.6-0.4-4.2,0.7l-2.1,1.5
				l3.5,1.9L407.3,322.8 M397.3,320.3l3.2,1.7l2.1-1.4c1-0.7,1.6-1.6,0.4-2.3c-0.9-0.5-2.2-0.4-3.7,0.6L397.3,320.3"
              ></path>
            </g>
            <g>
              <polygon
                points="388.6,325 398.5,330.4 397.2,331.3 383.8,331 391.6,335.2 390.4,336.1 380.5,330.8 381.7,329.9 395.3,330.2 
				387.4,325.9"
              ></polygon>
            </g>
            <g>
              <path
                d="M180.5,340.9c1.3-0.9,3-1.2,4.2-0.6c0.7,0.4,1,1,0.5,1.7l0,0c1.1-0.4,2.3-0.4,3.1,0.1c1.2,0.7,1,1.8-0.4,2.8
				c-1.3,0.9-2.8,1.2-4,1l0.4-0.8c0.8,0.1,1.8-0.1,2.7-0.7s1-1.4,0.2-1.8c-0.7-0.4-1.9-0.3-3,0.4l-0.6,0.4l-0.8-0.4l0.7-0.5
				c1-0.7,0.8-1.3,0.2-1.6c-0.7-0.4-1.8-0.2-2.6,0.3c-0.7,0.5-0.9,1-0.7,1.4l-1.1,0.3C179.2,342.5,179.4,341.7,180.5,340.9z"
              ></path>
            </g>
            <g>
              <path
                d="M174.9,344.9c1.2-0.8,3.1-1.2,4.4-0.4c0.8,0.4,1.2,1.1,1.2,2.2v2.4l0,0l3.3-2.3l0.8,0.4l-4.7,3.3l-0.6-0.3V347
				c0-0.8-0.1-1.5-0.8-1.9c-0.8-0.4-2-0.4-2.8,0.2c-0.7,0.5-0.9,1.1-0.6,1.7l-1.1,0.2C173.5,346.5,173.7,345.7,174.9,344.9z"
              ></path>
            </g>
            <g>
              <path
                d="M193.5,338.4l1.1-0.8l0.8,0.4l-1.1,0.8l1.3,0.7l-0.9,0.6l-1.3-0.7l-3.5,2.4l-0.6-0.3l-1.8-5.5l0.8-0.5L193.5,338.4z
				 M192.7,339l-3.7-2l1.3,3.7L192.7,339"
              ></path>
            </g>
            <g>
              <path
                d="M553.1,542.8c1.6-1.1,4.1-1.2,6.5,0.1c2.2,1.2,2.7,2.7,0.9,4c-1.6,1.1-4.1,1.2-6.5-0.1
				C551.9,545.6,551.3,544,553.1,542.8z M559.7,546.4c1.2-0.8,0.7-1.9-1-2.9c-1.9-1-3.7-1-4.8-0.3c-1.2,0.8-0.7,1.9,1,2.9
				C556.8,547.1,558.6,547.1,559.7,546.4"
              ></path>
            </g>
            <g>
              <path
                d="M546.8,547.2c1.2-0.8,3.1-1.2,4.4-0.4c0.8,0.4,1.2,1.1,1.2,2.2v2.4l0,0l3.3-2.3l0.8,0.4l-4.6,3.3l-0.6-0.3v-3.2
				c0-0.8-0.1-1.5-0.8-1.9c-0.8-0.4-2-0.4-2.8,0.2c-0.7,0.5-0.9,1.1-0.6,1.7l-1.1,0.2C545.5,548.8,545.7,548,546.8,547.2z"
              ></path>
            </g>
            <g>
              <path
                d="M564.2,539.2c1.1-0.4,2.4-0.5,3.4,0c1.3,0.7,0.9,1.9-0.6,3s-3.5,1.4-4.7,0.7c-1-0.5-1.1-1.3-0.5-2l0,0
				c-0.7,0.3-1.8,0.3-2.6-0.1c-1.2-0.6-0.9-1.7,0.4-2.6c1.3-0.9,3-1.2,4.1-0.6C564.5,538.1,564.6,538.8,564.2,539.2L564.2,539.2z
				 M566.3,541.8c1-0.7,1.1-1.5,0.3-1.9c-0.8-0.5-2.1-0.3-3.1,0.4s-1.1,1.5-0.3,1.9C564,542.7,565.3,542.5,566.3,541.8 M560.2,540.2
				c0.7,0.4,1.7,0.2,2.5-0.4c0.8-0.6,0.9-1.2,0.3-1.6c-0.7-0.4-1.7-0.2-2.5,0.3C559.6,539.2,559.5,539.9,560.2,540.2"
              ></path>
            </g>
            <g>
              <polygon
                fill="#D6D6D6"
                points="655.1,243.5 662.5,247.5 661.6,248.1 658.5,246.5 654.5,249.2 657.6,250.9 656.7,251.5 
				649.3,247.6 650.2,246.9 653.7,248.8 657.6,246 654.2,244.2"
              ></polygon>
            </g>
            <g>
              <path
                fill="#D6D6D6"
                d="M643.9,251.2c2.1-1.5,5.3-1.8,7.5-0.6s2.1,3.2,0,4.7c-2.2,1.5-5.3,1.8-7.5,0.6
				C641.7,254.7,641.8,252.8,643.9,251.2z M650.6,254.8c1.6-1.1,1.6-2.6-0.1-3.5c-1.7-0.9-4.1-0.7-5.7,0.4c-1.6,1.1-1.6,2.6,0.1,3.6
				C646.6,256.1,649,256,650.6,254.8"
              ></path>
            </g>
            <g>
              <polygon
                fill="#D6D6D6"
                points="639.2,254.6 640,255.1 636.2,257.8 638.8,259.2 642.1,256.9 642.9,257.3 639.6,259.6 
				642.7,261.3 641.8,262 634.4,258"
              ></polygon>
            </g>
            <g>
              <polygon points="747.5,173.1 754.6,177 753.7,177.6 747.6,174.3 747.3,175.9 746.2,175.9 746.7,173.7"></polygon>
            </g>
            <g>
              <path
                d="M741.6,177.2c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3v-3.1
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C740.3,178.8,740.5,178,741.6,177.2z"
              ></path>
            </g>
            <g>
              <path
                d="M736.2,181c1.2-0.8,3-1.1,4.3-0.4c0.8,0.4,1.2,1.1,1.1,2.2v2.3l0,0l3.2-2.3l0.8,0.4l-4.6,3.2l-0.6-0.3V183
				c0-0.8-0.1-1.4-0.8-1.8c-0.8-0.4-1.9-0.3-2.7,0.2c-0.7,0.5-0.9,1-0.6,1.6l-1.1,0.2C734.8,182.6,735,181.8,736.2,181z"
              ></path>
            </g>
            <g>
              <path
                d="M668.6,340.3l16.5,3.2l-1.6,1.1l-4-0.8l-5.4,3.8l1.8,2.3l-1.6,1.1l-7.3-9.6L668.6,340.3z M673.3,346.5l4.5-3.1l-8.2-1.7
				l0,0L673.3,346.5"
              ></path>
            </g>
            <g>
              <path
                d="M657.4,348.1c2.8-2,5.6-1.9,7.7-0.8c2.5,1.4,1.9,3.2-0.6,5L662,354l4.5,2.4l-1.5,1l-11.9-6.4L657.4,348.1z M663,351.7
				c2-1.4,1.9-2.5,0.5-3.3c-1.5-0.8-3.3-0.6-4.9,0.6l-2.6,1.8l4.7,2.5L663,351.7"
              ></path>
            </g>
            <g>
              <polygon points="678.8,333.6 690.3,339.8 688.9,340.8 679.1,335.5 678.5,338.1 676.7,338 677.6,334.5"></polygon>
            </g>
            <g>
              <path
                d="M567.7,299.1c2.8-2,5.6-2,7.7-0.8c2.5,1.4,1.9,3.2-0.6,5l-2.5,1.7l4.5,2.4l-1.5,1l-11.8-6.4L567.7,299.1z M573.3,302.7
				c2-1.4,1.9-2.5,0.5-3.3c-1.5-0.8-3.3-0.6-4.9,0.6l-2.6,1.8l4.7,2.5L573.3,302.7"
              ></path>
            </g>
            <g>
              <path
                d="M585.5,293.7c1.7-0.8,3.8-1.1,5.5-0.1c1.9,1,1.9,2.6-0.8,4.6l-4.4,3.1l-11.9-6.5l3.9-2.8c2.3-1.6,4.8-2.3,6.8-1.2
				C585.8,291.5,586.3,292.5,585.5,293.7L585.5,293.7z M588.7,297.5c1.6-1.1,2-2.2,0.6-2.9c-1.3-0.7-3.1-0.5-5,0.8l-2.6,1.8l4.2,2.2
				L588.7,297.5 M576.7,294.5l3.8,2l2.5-1.7c1.2-0.9,1.9-1.9,0.4-2.7c-1.1-0.6-2.6-0.5-4.4,0.8L576.7,294.5"
              ></path>
            </g>
            <g>
              <polygon points="588.4,285.1 599.9,291.3 598.5,292.3 588.7,287 588.1,289.6 586.3,289.5 587.2,285.9"></polygon>
            </g>
            <g>
              <polygon points="502.6,236.6 514.1,242.8 512.6,243.8 502.8,238.5 502.2,241 500.5,241 501.4,237.4"></polygon>
            </g>
            <g>
              <path
                d="M491.9,243.4c1.7-1.2,4.2-2,7-2.1l-0.2,1.3c-2.2,0-4,0.6-5.4,1.6c-2.7,1.9-2.5,4.2,0.2,5.7c2.8,1.5,6.5,1.2,9.1-0.6
				c1.6-1.1,2-2.3,1.8-3.5l2-0.3c0.2,1.4-0.4,3-2.5,4.5c-3.3,2.3-8.1,3.1-12,1C488.6,249.1,488.1,246.1,491.9,243.4z"
              ></path>
            </g>
            <g>
              <path
                d="M480.4,251.6c2.8-2,5.6-1.9,7.7-0.8c2.5,1.4,1.9,3.2-0.6,5l-2.5,1.7l4.5,2.4l-1.5,1l-11.9-6.4L480.4,251.6z M486,255.2
				c2-1.4,1.9-2.5,0.5-3.3c-1.5-0.8-3.3-0.6-4.9,0.6l-2.6,1.8l4.7,2.5L486,255.2"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
