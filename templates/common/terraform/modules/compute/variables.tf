variable "project_name" { type = string }
variable "environment"  { type = string }
variable "vpc_id"       { type = string }
variable "private_subnet_ids" { type = list(string) }
variable "app_sg_id"          { type = string }
variable "instance_count"     { type = number; default = 1 }
variable "target_group_arn"   { type = string }

variable "instance_type" {
  default = "t3.micro"
}

variable "ami_id" {
  description = "Amazon Linux 2023 AMI"
  type        = string
  default     = "ami-051f8b211046e76c0" # Thay đổi tùy region
}
