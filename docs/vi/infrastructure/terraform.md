# Hạ tầng dạng Mã (Terraform)

Trình tạo của chúng tôi cung cấp các mẫu cơ sở hạ tầng chuyên nghiệp sử dụng Terraform, hỗ trợ **AWS, Google Cloud (GCP) và Microsoft Azure**. Chúng tôi tuân theo các nguyên tắc của Well-Architected Framework trên tất cả các nhà cung cấp để đảm bảo tính bảo mật, độ tin cậy và hiệu quả về mặt chi phí.

Tư duy thiết kế và sơ đồ kiến trúc để triển khai trên cả ba nhà cung cấp dịch vụ đám mây là tương tự nhau. Chỉ có các tài nguyên gốc bên dưới (ví dụ: EC2 so với Compute Engine so với Virtual Machines) là khác nhau.

## Các cấp độ Cơ sở hạ tầng (Tiers)

Bạn có thể chọn giữa hai cấp độ tùy thuộc vào nhu cầu dự án và ngân sách của bạn.

| Tính năng | Tiêu chuẩn (Tối ưu Chi phí) | Production (Khả dụng Cao) |
| :--- | :--- | :--- |
| **Trường hợp sử dụng** | Dev, Staging, MVP | Môi trường Production, Ứng dụng lượng truy cập lớn |
| **WAF (Tường lửa)** | ❌ Tắt (Tiết kiệm chi phí) | ✅ Bật (Bảo vệ chống SQLi, XSS) |
| **Cơ sở dữ liệu** | Single Instance (Đơn lẻ) | **High Availability** (Tự động chuyển đổi dự phòng) |
| **Máy chủ tính toán** | 1 Instance / VM | **Nhiều Instance / VMSS** |
| **Mạng (NAT)** | 1 NAT Gateway | 1 NAT Gateway |

## Sơ đồ Kiến trúc trực quan

### Cấp độ Production (Khả dụng Cao)
Kiến trúc này được thiết kế để đảm bảo không có thời gian dừng hoạt động (zero-downtime) và bảo mật tối đa, phân phối tài nguyên ứng dụng và cơ sở dữ liệu trên nhiều vùng cách biệt.

![Production Architecture](/Production.png)

### Cấp độ Tiêu chuẩn (Tối ưu Chi phí)
Được tối ưu hóa cho môi trường phát triển thử nghiệm và các dự án MVP, giảm thiểu chi phí hàng tháng bằng cách sử dụng các tài nguyên đơn lẻ.

![Standard Architecture](/Standard.png)

## Chi tiết Kiến trúc

### Lớp Mạng (VPC / VNet)
Tất cả các nhà cung cấp đều sử dụng **kiến trúc mạng 3 tầng**:
1.  **Public Subnets**: Dành cho Bộ cân bằng tải (Load Balancers) và NAT Gateways.
2.  **Private Subnets**: Dành cho các máy chủ ứng dụng (Node.js). Không có truy cập trực tiếp từ internet công cộng.
3.  **Isolated Subnets**: Dành cho Cơ sở dữ liệu. Hoàn toàn cách ly khỏi môi trường internet bên ngoài.

### Tính năng Bảo mật
- **Nhóm bảo mật / Tường lửa (Security Groups)**: Tuân thủ nghiêm ngặt quy tắc "Quyền hạn tối thiểu". Cơ sở dữ liệu chỉ chấp nhận lưu lượng từ Máy chủ ứng dụng. Máy chủ ứng dụng chỉ chấp nhận lưu lượng từ Bộ cân bằng tải.
- **WAF (Chỉ cấp độ Production)**: Bảo vệ nâng cao tại biên (AWS WAF, Cloud Armor, Azure WAF) để chặn lưu lượng độc hại.

## Cấu trúc Thư mục

Khi bạn chọn Terraform, một thư mục `/terraform` sẽ được tạo ở thư mục gốc của dự án:

```text
/terraform
├── main.tf           # Điều phối gốc
├── variables.tf      # Các biến cấu hình
├── outputs.tf        # Kết quả triển khai
├── provider.tf       # Cấu hình Cloud Provider (AWS/GCP/Azure)
└── modules/          # Các mô-đun tái sử dụng
    ├── vpc/          # Mạng (VPC, Subnets, NAT)
    ├── security/     # WAF, Load Balancers, Firewalls
    ├── database/     # Cloud SQL / RDS / Flexible Server
    ├── compute/      # EC2 / GCE / VMSS
    └── cache/        # ElastiCache / Memorystore / Redis Cache
```

## Cách triển khai

### 1. Yêu cầu tiên quyết & Xác thực
Cài đặt Terraform CLI và Cloud CLI bạn chọn, sau đó xác thực:

::: code-group
```bash [AWS]
# Cài đặt AWS CLI: https://aws.amazon.com/cli/
aws configure
```

```bash [GCP]
# Cài đặt Google Cloud CLI: https://cloud.google.com/sdk/docs/install
gcloud auth application-default login

# Lưu ý: Bạn PHẢI mở tệp `terraform/provider.tf` và thay thế `my-gcp-project-id` 
# bằng ID GCP Project thực tế của bạn trước khi chạy terraform!
```

```bash [Azure]
# Cài đặt Azure CLI: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
az login
```
:::

### 2. Khởi tạo
Di chuyển vào thư mục terraform và chạy lệnh khởi tạo:
```bash
cd terraform
terraform init
```

### 3. Xem trước & Lập kế hoạch
Kiểm tra xem những tài nguyên nào sẽ được tạo trên đám mây. Bước này hoàn toàn miễn phí:
```bash
terraform plan
```

### 4. Áp dụng triển khai
Triển khai cơ sở hạ tầng lên Nhà cung cấp dịch vụ đám mây của bạn:
```bash
terraform apply
```

> [!WARNING] CẢNH BÁO
> Việc chạy lệnh `terraform apply` trên tài khoản đám mây thực tế sẽ phát sinh chi phí. Luôn chạy `terraform destroy` khi bạn hoàn thành kiểm thử để tránh các hóa đơn ngoài dự kiến.

---

## Kiểm thử cục bộ (Sử dụng LocalStack)

> [!IMPORTANT] QUAN TRỌNG
> **Chỉ áp dụng với AWS**: LocalStack được thiết kế cụ thể để mô phỏng dịch vụ AWS. Không có bộ giả lập quy mô tương đương cho các tài nguyên GCP hoặc Azure VPC/Compute. Do đó, phương pháp kiểm thử này **chỉ hoạt động nếu bạn tạo một dự án AWS**.

> [!WARNING] CẢNH BÁO
> **Yêu cầu LocalStack Pro đối với một số Tính năng Nâng cao**
> Phiên bản miễn phí (Community Edition) của LocalStack không hỗ trợ RDS (Cơ sở dữ liệu), ELBv2 (Bộ cân bằng tải) hoặc NAT Gateways. Nếu bạn triển khai các template Production hoặc Standard lên phiên bản LocalStack miễn phí, bạn sẽ gặp lỗi `StatusCode: 501, API for service 'rds/elbv2' not yet implemented`. Bạn phải có giấy phép LocalStack Pro hoặc kiểm thử các tài nguyên cụ thể này trên tài khoản AWS thực tế.

Bạn có thể kiểm thử hạ tầng AWS cục bộ bằng [LocalStack](https://localstack.cloud/), cho phép xác thực cấu hình Terraform mà không tốn chi phí trên AWS.

### 1. Yêu cầu tiên quyết
- Docker Desktop đang chạy.
- Cài đặt LocalStack CLI: `pip install localstack`.
- Cài đặt trình bao gói Terraform Local: `pip install terraform-local`.

### 2. Khởi động LocalStack
Mở terminal của bạn và chạy:
```bash
localstack start -d
```

### 3. Triển khai cục bộ (Sử dụng tflocal - Khuyến nghị)
Để tự động điều hướng Terraform về môi trường cục bộ mà không cần sửa đổi mã nguồn, hãy sử dụng lệnh `tflocal` thay cho `terraform`:

```bash
cd terraform
tflocal init
tflocal plan
tflocal apply -auto-approve
```

### 3b. Triển khai cục bộ (Ghi đè thủ công - Tùy chọn thay thế)
Nếu bạn không muốn sử dụng `tflocal`, bạn có thể ghi đè thủ công cấu hình nhà cung cấp:

1. Tạo một tệp `localstack.tf` bên trong thư mục `/terraform`:
```hcl
provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    ec2           = "http://localhost:4566"
    rds           = "http://localhost:4566"
    elb           = "http://localhost:4566"
    elbv2         = "http://localhost:4566"
    wafv2         = "http://localhost:4566"
    iam           = "http://localhost:4566"
    sts           = "http://localhost:4566"
    elasticache   = "http://localhost:4566"
  }
}
```
2. Comment (vô hiệu hóa) khối `provider "aws"` ban đầu trong tệp `provider.tf`.
3. Chạy lệnh `terraform init` và `terraform apply` tiêu chuẩn.

> [!IMPORTANT] QUAN TRỌNG
> **Khắc phục sự cố: Lỗi Tìm kiếm AMI trong LocalStack**
> Nếu bạn gặp lỗi `data.aws_ami.latest: Search returned no results` trong bước plan hoặc apply, đó là do mặc định LocalStack không giả lập AMI `"amzn2-ami-hvm-*"` tiêu chuẩn.
> 
> Để khắc phục, mở tệp `/terraform/modules/compute/main.tf` và đổi bộ lọc tên AMI thành `"*"`:
> ```hcl
> filter {
>   name   = "name"
>   values = ["*"]
> }
> ```
> > [!WARNING] CẢNH BÁO
> > Hãy nhớ hoàn tác bộ lọc về lại `"amzn2-ami-hvm-*"` trước khi triển khai lên AWS thực tế!

---

## Chiến lược kiểm thử GCP & Azure

Không giống như AWS, **Google Cloud (GCP)** và **Microsoft Azure** không có các bộ giả lập cục bộ toàn diện (như LocalStack) cho cơ sở hạ tầng cốt lõi như VPC, Máy ảo hay Cơ sở dữ liệu SQL.

Để kiểm thử cấu hình Terraform của GCP hoặc Azure mà không ảnh hưởng đến môi trường thực tế, bạn nên sử dụng các phương pháp tiêu chuẩn sau:

### 1. Dry-Run (Xác thực Cú pháp & Logic)
Bạn có thể xác thực logic Terraform, liên kết các mô-đun và cú pháp cục bộ mà không thực sự tạo ra bất kỳ tài nguyên thực tế nào.

> [!IMPORTANT] QUAN TRỌNG
> **Yêu cầu Xác thực:** Ngay cả đối với chạy thử (dry-run), Terraform vẫn cần truy vấn Cloud API. Hãy chắc chắn rằng bạn đã đăng nhập trước (`gcloud auth application-default login` cho GCP, hoặc `az login` cho Azure).

```bash
cd terraform
terraform init
terraform validate  # Kiểm tra lỗi cú pháp và cấu trúc
terraform plan      # Mô phỏng quá trình triển khai và hiển thị những gì SẼ được tạo ra
```
Nếu lệnh `terraform plan` thành công và liệt kê các tài nguyên (ví dụ: `+ azurerm_virtual_network` hoặc `+ google_compute_network`), mã nguồn của bạn là hoàn toàn hợp lệ.

### 2. Môi trường Sandbox / Gói đăng ký thử nghiệm (Triển khai thực tế)
Để thực hiện kiểm thử E2E đầy đủ cho GCP hoặc Azure, phương pháp tiêu chuẩn là triển khai vào một môi trường đám mây độc lập:
- **GCP**: Tạo một GCP Project "Sandbox" riêng biệt. Triển khai tài nguyên, kiểm tra chúng, và sau đó chạy lệnh `terraform destroy` để thu dọn tài nguyên ngay lập tức.
- **Azure**: Tạo một Azure Subscription miễn phí dành cho việc "Dev/Test" hoặc một Resource Group tạm thời. Triển khai, kiểm thử, sau đó xóa toàn bộ Resource Group đó để tránh phát sinh chi phí.

> [!TIP] Tìm hiểu sâu về Kiến trúc AWS Không tin cậy (Zero-Trust)
> Bạn muốn hiểu rõ kiến trúc đằng sau cách triển khai này? Chúng tôi đã xuất bản các bài viết chi tiết trên **System Weakness (Medium)** về chính các mẫu thiết kế này:
> [Why Your Default VPC is a Hacker’s Playground: Designing a Zero-Trust AWS Architecture](https://medium.com/system-weakness/why-your-default-vpc-is-a-hackers-playground-designing-a-zero-trust-aws-architecture-7551102193cd)
