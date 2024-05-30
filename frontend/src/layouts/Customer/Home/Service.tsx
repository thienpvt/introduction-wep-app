import vector1 from "../../../assets/images/vector1.png";
import vector2 from "../../../assets/images/vector2.png";
import vector3 from "../../../assets/images/vector3.png";

export function Service() {
    return (
        <div className="container-fluid mt-4">
            <div className="text-center ">
                <h4 className="mb-4 bold" style={{ color: "#0B3963" }}>DỊCH VỤ CHÚNG TÔI CUNG CẤP</h4>
                <h5 style={{ color: "#0B3963" }}>Tư vấn, cung cấp các sản phẩm thiết bị chiếu sáng, thiết bị điện dân dụng, đồ gia dụng...</h5>
            </div>
            <div className="row mt-5">
                <div className="col-md-4 mb-4">
                    <img src={vector1} alt="" className="img-fluid mb-3" />
                    <h6 className="mb-2 bold" style={{ color: "#0B3963" }}>THIẾT BỊ CHIẾU SÁNG</h6>
                    <h6 className=" bold"  style={{ color: "#0B3963" }}>Chuyên cung cấp các thiết bị điện, đèn chiếu sáng, đèn âm trần, led, năng lượng mặt trời; thiết bị bếp, quạt điện, gia dụng tổng hợp...</h6>
                </div>
                <div className="col-md-4 mb-4">
                    <img src={vector2} alt="" className="img-fluid mb-3" />
                    <h6 className="mb-2 bold" style={{ color: "#0B3963" }}>THIẾT BỊ ĐIỆN DÂN DỤNG</h6>
                    <h6 className=" bold"   style={{ color: "#0B3963" }}>Tất cả các thiết bị cam kết chính hãng, mẫu mã đa dạng, bền bỉ với thời gian</h6>
                </div>
                <div className="col-md-4 mb-4">
                    <img src={vector3} alt="" className="img-fluid mb-3" />
                    <h6 className="mb-2" style={{ color: "#0B3963" }}>THIẾT BỊ GIA DỤNG</h6>
                    <h6 className=" bold"   style={{ color: "#0B3963" }}>Cung cấp các sản phẩm giá tốt, bảo hành lâu dài, nói “Không hàng nhái, hàng giả, hàng kém chất lượng...”</h6>
                </div>
            </div>
        </div>
    );
}

