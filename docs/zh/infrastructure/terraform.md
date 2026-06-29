# 基础设施即代码 (Terraform)

我们的生成器使用 Terraform 提供了专业级的基础设施模板，支持 **AWS、Google Cloud (GCP) 和 Microsoft Azure**。我们在所有云厂商的设计中都遵循 Well-Architected 架构原则，以确保安全性、可靠性和成本效益。

在所有三个云厂商上部署的思维模式和架构拓扑是完全相同的。只有底层的原生资源名称 (例如，EC2 vs Compute Engine vs Virtual Machines) 有所不同。

## 基础设施层级 (Tiers)

您可以根据项目需求和预算在两个层级之间进行选择。

| 特性 | 标准版 (成本优化) | 生产版 (高可用) |
| :--- | :--- | :--- |
| **目标场景** | 开发、测试、MVP 阶段 | 生产环境、高流量应用 |
| **WAF (防火墙)** | ❌ 禁用 (节省成本) | ✅ 启用 (SQLi、XSS 防护) |
| **数据库** | 单实例 (Single Instance) | **高可用** (自动故障转移) |
| **计算实例** | 1个实例 / VM | **多个实例 / VMSS** |
| **网络 (NAT)** | 1个 NAT 网关 | 1个 NAT 网关 |

## 架构拓扑图

### 生产版 (高可用)
此架构设计用于零停机时间和最大安全性，将应用和数据库资源分布在多个独立的可用区中。

![Production Architecture](/Production.png)

### 标准版 (成本优化)
针对开发和 MVP 进行了优化，通过使用单实例资源降低每月费用。

![Standard Architecture](/Standard.png)

## 架构细节

### 网络层 (VPC / VNet)
所有厂商都使用 **3层网络架构**：
1. **Public Subnets (公有子网)**: 用于负载均衡器 (Load Balancers) 和 NAT 网关。
2. **Private Subnets (私有子网)**: 用于应用程序 (Node.js) 实例。禁止直接从外网访问。
3. **Isolated Subnets (隔离子网)**: 用于数据库。完全与互联网物理隔离。

### 安全特性
- **安全组 / 防火墙 (Security Groups)**: 严格遵循“最小权限”原则。数据库仅接收来自应用服务器的流量。应用服务器仅接收来自负载均衡器的流量。
- **WAF (仅限生产版)**: 边缘高级防护 (AWS WAF, Cloud Armor, Azure WAF) 以拦截恶意流量。

## 目录结构

当您选择 Terraform 时，项目根目录下会创建一个 `/terraform` 文件夹：

```text
/terraform
├── main.tf           # 根编排文件
├── variables.tf      # 配置变量
├── outputs.tf        # 部署输出结果
├── provider.tf       # 云厂商配置 (AWS/GCP/Azure)
└── modules/          # 可复用模块
    ├── vpc/          # 网络配置 (VPC, 子网, NAT)
    ├── security/     # WAF, 负载均衡, 防火墙
    ├── database/     # Cloud SQL / RDS / 弹性服务器
    ├── compute/      # EC2 / GCE / VMSS
    └── cache/        # ElastiCache / Memorystore / Redis 缓存
```

## 如何部署

### 1. 前置条件与身份认证
安装 Terraform CLI 和您选择的云厂商 CLI，然后进行身份认证：

::: code-group
```bash [AWS]
# 安装 AWS CLI: https://aws.amazon.com/cli/
aws configure
```

```bash [GCP]
# 安装 Google Cloud CLI: https://cloud.google.com/sdk/docs/install
gcloud auth application-default login

# 注意：在运行 terraform 之前，您必须打开 `terraform/provider.tf`
# 并将 `my-gcp-project-id` 替换为您实际的 GCP 项目 ID！
```

```bash [Azure]
# 安装 Azure CLI: https://learn.microsoft.com/en-us/cli/azure/install-azure-cli
az login
```
:::

### 2. 初始化
导航到 terraform 文件夹并运行初始化：
```bash
cd terraform
terraform init
```

### 3. 查看计划
检查将创建哪些资源。此步骤不会产生任何费用：
```bash
terraform plan
```

### 4. 部署应用
将基础设施部署到您的云账户：
```bash
terraform apply
```

> [!WARNING] 警告
> 在真实的云账户上运行 `terraform apply` 会产生费用。测试完毕后，务必运行 `terraform destroy` 以清理资源，避免产生意外账单。

---

## 本地测试 (使用 LocalStack)

> [!IMPORTANT] 重要
> **仅限 AWS**：LocalStack 专门用于模拟 AWS。GCP 或 Azure 暂时没有同等规模的本地模拟器。因此，此本地测试方法**仅在您生成了 AWS 项目时才有效**。

> [!WARNING] 警告
> **高级功能需要 LocalStack Pro**
> 免费版的 LocalStack 不支持 RDS (数据库)、ELBv2 (负载均衡) 或 NAT 网关。如果您尝试将生产版或标准版模板部署到免费版 LocalStack，您将遇到 `StatusCode: 501, API for service 'rds/elbv2' not yet implemented` 错误。您必须拥有 LocalStack Pro 许可证或在真实的 AWS 账户上测试这些特定资源。

您可以使用 [LocalStack](https://localstack.cloud/) 在本地测试您的 AWS 基础设施，从而在不花钱的情况下验证您的 Terraform 配置。

### 1. 前置条件
- Docker Desktop 正在运行。
- 已安装 LocalStack CLI: `pip install localstack`。
- 已安装 Terraform Local 包装器: `pip install terraform-local`。

### 2. 启动 LocalStack
打开终端并运行：
```bash
localstack start -d
```

### 3. 本地部署 (使用 tflocal - 推荐)
要自动将 Terraform 重定向到本地环境而无需修改代码，请使用 `tflocal` 命令代替 `terraform`：

```bash
cd terraform
tflocal init
tflocal plan
tflocal apply -auto-approve
```

### 3b. 本地部署 (手动覆盖 - 备选方案)
如果您不想使用 `tflocal`，可以手动覆盖提供程序设置：

1. 在 `/terraform` 文件夹内创建一个 `localstack.tf` 文件：
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
2. 注释掉 `provider.tf` 中原始的 `provider "aws"` 代码块。
3. 运行标准的 `terraform init` 和 `terraform apply`。

> [!IMPORTANT] 重要
> **排错：LocalStack 中的 AMI 查找失败**
> 如果您在 plan 或 apply 阶段遇到 `data.aws_ami.latest: Search returned no results`，这是因为 LocalStack 默认不包含标准的 `"amzn2-ami-hvm-*"` 映像。
> 
> 要解决此问题，请打开您的 `/terraform/modules/compute/main.tf` 并将 AMI 过滤器名称更改为 `"*"`：
> ```hcl
> filter {
>   name   = "name"
>   values = ["*"]
> }
> ```
> > [!WARNING] 警告
> > 请务必在部署到真实 AWS 之前，将过滤器改回 `"amzn2-ami-hvm-*"`！

---

## GCP 和 Azure 测试策略

与 AWS 不同，**Google Cloud (GCP)** 和 **Microsoft Azure** 没有用于 VPC、虚拟机或托管 SQL 数据库等核心基础设施的完整本地模拟器。

要在不影响生产环境的情况下测试 GCP 或 Azure 的 Terraform 配置，您应该使用以下行业标准方法：

### 1. 干跑测试 (语法与逻辑验证)
您可以在本地验证您的 Terraform 逻辑、模块依赖和语法，而无需真正创建资源。

> [!IMPORTANT] 重要
> **需要身份验证：** 即使是干跑测试，Terraform 也需要查询云端 API。请确保先登录 (GCP 运行 `gcloud auth application-default login`，Azure 运行 `az login`)。

```bash
cd terraform
terraform init
terraform validate  # 检查语法和结构
terraform plan      # 模拟部署并显示将创建哪些资源
```
如果 `terraform plan` 成功运行并列出了资源 (例如，`+ azurerm_virtual_network` 或 `+ google_compute_network`)，则表示您生成的代码完全有效。

### 2. 沙箱 / 开发订阅 (真实部署)
要在 GCP 或 Azure 上进行完整的端到端测试，标准做法是部署到隔离的云环境中：
- **GCP**: 创建一个独立的“沙箱” GCP 项目。部署资源，进行测试，然后立即运行 `terraform destroy` 将其销毁。
- **Azure**: 创建免费层级的“开发/测试”订阅或临时资源组。部署、测试，然后直接删除整个资源组以避免计费。

> [!TIP] 深入研究基础设施：零信任 AWS 架构设计
> 想要了解此实现背后的设计模式？我们在 **System Weakness (Medium)** 上发表了关于这些架构的详细文章：
> [Why Your Default VPC is a Hacker’s Playground: Designing a Zero-Trust AWS Architecture](https://medium.com/system-weakness/why-your-default-vpc-is-a-hackers-playground-designing-a-zero-trust-aws-architecture-7551102193cd)
