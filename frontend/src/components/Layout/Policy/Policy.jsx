import "./Policy.css";

const Policy = () => {
  return (
    <section className="policy">
      <div className="container">
        <ul className="policy-list">
          <li className="policy-item">
            <i className="bi bi-truck"></i>
            <div className="policy-texts">
              <strong>ÜCRETSİZ KARGO</strong>
              <span>100₺ ve Üzerine Ücretsiz Kargo</span>
            </div>
          </li>
          <li className="policy-item">
            <i className="bi bi-headset"></i>
            <div className="policy-texts">
              <strong>7/24 CANLI DESTEK</strong>
              <span>24 Saat Canlı Destek</span>
            </div>
          </li>
          <li className="policy-item">
            <i className="bi bi-arrow-clockwise"></i>
            <div className="policy-texts">
              <strong> 30 GÜN İADE</strong>
              <span>30 Gün İçinde İade Etmeniz Yeterli</span>
            </div>
          </li>
          <li className="policy-item">
            <i className="bi bi-credit-card"></i>
            <div className="policy-texts">
              <strong> ÖDEME YÖNTEMİ</strong>
              <span>Güvenli Ödeme</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Policy;