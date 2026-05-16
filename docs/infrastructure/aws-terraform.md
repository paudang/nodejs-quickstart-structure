# AWS Infrastructure (IaC - Terraform)

Our generator provides professional-grade AWS infrastructure templates using Terraform. We follow **AWS Well-Architected Framework** principles to ensure security, reliability, and cost-efficiency.

## Infrastructure Tiers

You can choose between two tiers depending on your project needs and budget.

| Feature | Standard (Cost-Efficient) | Production (High Availability) |
| :--- | :--- | :--- |
| **Target Use Case** | Dev, Staging, MVP | Production, High-Traffic Apps |
| **AWS WAF** | ❌ Disabled (Save ~$30/mo) | ✅ Enabled (SQLi, XSS Protection) |
| **RDS Database** | Single Instance | **Multi-AZ** (Automatic Failover) |
| **Compute (EC2)** | 1 Instance | **Multiple Instances** (Cross-AZ) |
| **NAT Gateway** | 1 NAT (Shared) | 1 NAT per AZ (High Availability) |
| **Estimated Cost** | ~$20 - $50/mo (Free Tier possible) | ~$150 - $250/mo |

## Architecture Overview

### Network Layer (VPC)
Both tiers use a **3-tier VPC architecture**:
1.  **Public Subnets**: For Load Balancers (ALB) and NAT Gateways.
2.  **Private Subnets**: For Application (Node.js) instances. No direct public access.
3.  **Isolated Subnets**: For Databases (RDS). Completely air-gapped from the internet.

### Security Features
- **Security Groups**: Strict "Least Privilege" rules. Database only accepts traffic from Application. Application only accepts traffic from ALB.
- **SSM Management**: No SSH (Port 22) needed. Management is done via AWS Systems Manager for better security audit.
- **WAF (Production Only)**: Advanced protection at the edge to block malicious traffic.

## File Structure

When you select Terraform, a `/terraform` folder is created at your project root:

```text
/terraform
├── main.tf           # Root orchestration
├── variables.tf      # Configuration variables
├── outputs.tf        # Deployment results
├── provider.tf       # AWS Provider config
└── modules/          # Reusable modules
    ├── vpc/          # Networking
    ├── security/     # WAF, ALB, SGs
    ├── database/     # RDS Instance
    ├── compute/      # EC2 Instances
    └── cache/        # ElastiCache Redis
```

## How to Deploy

### 1. Prerequisites
- [AWS CLI](https://aws.amazon.com/cli/) configured with your credentials.
- [Terraform CLI](https://developer.hashicorp.com/terraform/downloads) installed.

### 2. Initialization
Navigate to the terraform folder and initialize:
```bash
cd terraform
terraform init
```

### 3. Review & Plan
Check what resources will be created:
```bash
terraform plan
```

### 4. Apply
Deploy the infrastructure to AWS:
```bash
terraform apply
```

> [!WARNING]
> Running `terraform apply` will incur costs on your AWS account. Always run `terraform destroy` when you are done testing to avoid unexpected charges.
