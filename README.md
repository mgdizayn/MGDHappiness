# MGD Happiness — Hasta Memnuniyet Anketi

**Nazilli Devlet Hastanesi** — Bilgi İşlem Birimi  
MGdizayn · Mustafa GÜNEŞDOĞDU

---

## Kullanım

Bu repo, MGD Happiness sisteminin **web arayüzünü** barındırır.  
GitHub Pages üzerinden yayınlanır — hasta telefonu (4G/5G/WiFi) üzerinden QR okutarak erişir.

### Mimari

```
Hasta telefonu (herhangi ağ)
        │
   GitHub Pages (bu repo)
   index.html
        │
        └── WSS ──► broker.emqx.io ◄── TCP ── server_gui.py (Hastane PC)
```

- **Port açma gerekmez** — broker.emqx.io köprüsü kullanılır  
- **4G/5G dahil** her ağdan erişilebilir  
- **PWA** — telefona yüklenebilir (Ana ekrana ekle)

### Sunucu Kurulum

```bash
pip install customtkinter paho-mqtt pillow openpyxl
python run_server.py
```

---

*v1.1 — 2026*
