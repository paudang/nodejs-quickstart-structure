# --- Network Layer ---
module "vpc" {
  source       = "./modules/vpc"
  project_name = var.project_name
  environment  = var.environment
}

# --- Security Layer (WAF, ALB, SGs) ---
module "security" {
  source            = "./modules/security"
  project_name      = var.project_name
  environment       = var.environment
  vpc_id            = module.vpc.vpc_id
  public_subnet_ids = module.vpc.public_subnet_ids
  enable_waf        = var.is_production
}

# --- Data Layer (RDS Isolated) ---
module "database" {
  source              = "./modules/database"
  project_name        = var.project_name
  environment         = var.environment
  vpc_id              = module.vpc.vpc_id
  isolated_subnet_ids = module.vpc.isolated_subnet_ids
  app_sg_id           = module.security.app_sg_id
  db_engine           = var.db_engine
  db_name             = var.db_name
  db_user             = var.db_user
  multi_az            = var.is_production
}

# --- Cache Layer (Redis ElastiCache) ---
module "cache" {
  source             = "./modules/cache"
  project_name       = var.project_name
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  app_sg_id          = module.security.app_sg_id
}

# --- Compute Layer (App EC2) ---
module "compute" {
  source             = "./modules/compute"
  project_name       = var.project_name
  environment        = var.environment
  vpc_id             = module.vpc.vpc_id
  private_subnet_ids = module.vpc.private_subnet_ids
  app_sg_id          = module.security.app_sg_id
  target_group_arn   = module.security.alb_target_group_arn
  instance_count     = var.is_production ? 2 : 1
}
