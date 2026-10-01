# Hướng dẫn cài đặt Góc Lặng (PWA + Firebase + Google Drive)

Làm một lần, mất khoảng 30–45 phút. Sau đó bạn và tài khoản thứ hai chỉ cần mở link, đăng nhập Google là có nhật ký riêng của mình trên mọi thiết bị.

```
goc-lang-pwa/
├── public/                    ← toàn bộ app (được đưa lên mạng)
│   ├── index.html             ← app Góc Lặng
│   ├── firebase-config.js     ← ⚙️ FILE DUY NHẤT CẦN SỬA
│   ├── manifest.webmanifest   ← thông tin để cài như app thật
│   ├── sw.js                  ← giúp app chạy khi mất mạng
│   └── icons/                 ← logo các kích thước
├── firebase.json              ← cấu hình Firebase Hosting
├── firestore.rules            ← quy tắc bảo mật (mỗi người chỉ đọc nhật ký của mình)
└── .firebaserc                ← tên dự án Firebase
```

---

## 1. Tạo dự án Firebase

1. Vào <https://console.firebase.google.com> và đăng nhập bằng **vincenthoclaudepro@gmail.com**.
2. Bấm **Create a project** (Tạo dự án) → đặt tên, ví dụ `goc-lang`. Google Analytics: có thể tắt.
3. Ghi lại **Project ID** (ví dụ `goc-lang-1a2b3`). Bạn sẽ cần nó nhiều lần bên dưới.

## 2. Bật đăng nhập bằng Google

1. Menu trái: **Build → Authentication → Get started**.
2. Tab **Sign-in method** → chọn **Google** → bật **Enable** → chọn email hỗ trợ → **Save**.

## 3. Tạo cơ sở dữ liệu Firestore

1. **Build → Firestore Database → Create database**.
2. Vị trí: chọn **asia-southeast1 (Singapore)**, gần Việt Nam nhất. Lưu ý: không đổi được sau này.
3. Chọn **Production mode**. Quy tắc bảo mật sẽ được đưa lên từ file `firestore.rules` ở bước 7.

## 4. Đăng ký Web app và lấy cấu hình

1. Bấm biểu tượng bánh răng → **Project settings** → kéo xuống **Your apps** → bấm biểu tượng **`</>`** (Web).
2. Đặt tên `Góc Lặng`, tick **Also set up Firebase Hosting** → **Register app**.
3. Firebase hiện một đoạn `const firebaseConfig = { ... }`. Chép từng giá trị vào `public/firebase-config.js`:

```js
firebase: {
  apiKey: "AIza....",
  authDomain: "goc-lang-1a2b3.web.app",   // ⚠️ đổi thành <Project ID>.web.app
  projectId: "goc-lang-1a2b3",
  storageBucket: "goc-lang-1a2b3.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
},
```

> **Vì sao đổi `authDomain` thành `.web.app`?** Safari trên iPhone chặn đăng nhập khi trang đăng nhập nằm ở tên miền khác với app. Đặt `authDomain` trùng với tên miền app chạy (`<Project ID>.web.app`) thì đăng nhập trên iPhone ổn định hơn, nhất là khi đã cài app ra màn hình chính.

4. Kiểm tra **Authentication → Settings → Authorized domains**: phải có `<Project ID>.web.app` và `<Project ID>.firebaseapp.com`. Firebase thường tự thêm sẵn.

## 5. Bật sao lưu Google Drive

1. Mở <https://console.cloud.google.com>, chọn đúng dự án vừa tạo (cùng tên với dự án Firebase).
2. **APIs & Services → Library** → tìm **Google Drive API** → **Enable**.
3. **Google Auth Platform** (hoặc **OAuth consent screen**):
   - **Branding**: tên app `Góc Lặng`, email hỗ trợ.
   - **Audience**: chọn **External**, giữ trạng thái **Testing** → mục **Test users** → **Add users**: thêm **cả hai email** (của bạn và tài khoản thứ hai).
   - **Data access**: **Add or remove scopes** → thêm `.../auth/drive.file`.
4. **Clients** (hoặc **APIs & Services → Credentials**): mở client tên **"Web client (auto created by Google Service)"**:
   - **Authorized JavaScript origins**: thêm `https://<Project ID>.web.app` và `https://<Project ID>.firebaseapp.com`.
   - Chép **Client ID** (dạng `....apps.googleusercontent.com`) vào `googleClientId` trong `firebase-config.js`.

> Quyền `drive.file` chỉ cho app đọc/ghi **những file do chính app tạo**. App không xem được các file khác trong Drive. Bản sao lưu nằm trong thư mục **"Góc Lặng - Sao lưu"** trong Drive của từng người.

## 6. Khai báo hai tài khoản được dùng app

Sửa **hai chỗ** cho giống nhau, thay `TAI-KHOAN-THU-HAI@gmail.com` bằng email thật:

- `public/firebase-config.js` → `allowedEmails: [...]`
- `firestore.rules` → dòng `request.auth.token.email in [...]`

App đã có link công khai, nên danh sách này chặn người lạ đăng nhập. Muốn thêm người sau này thì sửa lại cả hai chỗ, thêm họ vào Test users ở bước 5 rồi triển khai lại (bước 7).

## 7. Đưa app lên mạng (Firebase Hosting)

1. Cài **Node.js** bản LTS từ <https://nodejs.org>.
2. Mở **Terminal** trên Mac và chạy từng lệnh:

```bash
npm install -g firebase-tools
cd ~/Documents/"App Journaling"/goc-lang-pwa
firebase login                       # mở trình duyệt để đăng nhập Google
firebase use --add                   # chọn dự án vừa tạo, đặt alias: default
firebase deploy                      # đưa app + quy tắc bảo mật lên
```

3. Xong, app chạy tại **`https://<Project ID>.web.app`**.

## 8. Cài app lên điện thoại

- **iPhone/iPad**: mở link bằng **Safari** → nút **Chia sẻ** → **Thêm vào MH chính**.
- **Android**: mở bằng **Chrome** → menu **⋮** → **Cài đặt ứng dụng**.
- **Máy tính** (Chrome/Edge): bấm biểu tượng cài đặt ở cuối thanh địa chỉ.

Mỗi lần mở app, logo sẽ có hiệu ứng mặt trời mọc, rồi chuyển sang màn hình đăng nhập.

## 9. Chuyển nhật ký cũ sang app mới

Nhật ký hiện tại đang nằm trong trình duyệt, gắn với file `nhat-ky.html`. Để chuyển:

1. Mở `nhat-ky.html` cũ → **Cài đặt** → **Tải file mang theo** (hoặc **Tải bản sao lưu .json**).
2. Mở app mới qua link → đăng nhập → **Cài đặt** → **Nhập từ file…** → chọn file vừa tải.
3. Nhật ký sẽ đưa lên tài khoản và tự đồng bộ sang mọi thiết bị.

## 10. Cập nhật app sau này

Sửa file trong `public/`, mở `public/sw.js`, tăng số phiên bản (`goclang-v1` → `goclang-v2`), rồi chạy lại `firebase deploy`. Lần mở tiếp theo, app trên điện thoại sẽ tự lấy bản mới.

---

## Riêng tư — nên nói rõ với tài khoản thứ hai

- Mỗi tài khoản **chỉ đọc và ghi được nhật ký của chính mình**. Quy tắc trong `firestore.rules` bảo đảm điều này, kể cả khi ai đó cố tình gọi thẳng vào cơ sở dữ liệu.
- **Chủ dự án Firebase** (tài khoản tạo dự án ở bước 1) vẫn **xem được dữ liệu của mọi người** trong Firebase Console. Dữ liệu không được mã hoá đầu-cuối. Nếu người kia cần riêng tư tuyệt đối với cả bạn, họ nên tự tạo một dự án Firebase riêng.
- Bản sao lưu Drive nằm trong Drive của **từng người**. Người này không thấy bản của người kia.

## Chi phí

Gói miễn phí (Spark) của Firebase dư sức cho nhật ký của vài người: Hosting, đăng nhập Google và Firestore đều nằm trong hạn mức miễn phí. Không cần nhập thẻ thanh toán.

## Gặp lỗi?

| Hiện tượng | Cách xử lý |
|---|---|
| "Tên miền này chưa được cho phép đăng nhập" | Thêm tên miền vào Authentication → Settings → Authorized domains (bước 4) |
| "Tài khoản … chưa được cấp quyền" | Kiểm tra email trong `allowedEmails` **và** `firestore.rules`, rồi `firebase deploy` |
| Đăng nhập trên iPhone (app đã cài) cứ quay lại màn hình đăng nhập | Kiểm tra `authDomain` đã là `<Project ID>.web.app` chưa (bước 4) |
| Bấm "Sao lưu lên Drive" báo chưa cấp quyền | Kiểm tra bước 5: đã bật Drive API, đã thêm email vào Test users, đã thêm JavaScript origins |
| Mở app hiện "App chưa được cấu hình Firebase" | `firebase-config.js` còn trống `apiKey`/`projectId` |
| Vẫn thấy bản cũ sau khi cập nhật | Tăng `VERSION` trong `sw.js`, deploy lại, đóng hẳn app rồi mở lại |
