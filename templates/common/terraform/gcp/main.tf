# --- Network Layer ---
module "vpc" {
  source        = "./modules/vpc"
  project_name  = var.project_name
  environment   = var.environment
  is_production = var.is_production
  region        = var.gcp_region
}

# --- Security Layer (WAF, ALB, SGs) ---
module "security" {
  source            = "./modules/security"
  project_name      = var.project_name
  environment       = var.environment
  network_name      = module.vpc.network_name
  enable_waf        = var.is_production
}

# --- Data Layer (RDS Isolated) ---
module "database" {
  source              = "./modules/database"
  project_name        = var.project_name
  environment         = var.environment
  region              = var.gcp_region
  network_id          = module.vpc.network_id
  db_engine           = var.db_engine
  db_name             = var.db_name
  db_user             = var.db_user
  multi_az            = var.is_production
}

# --- Cache Layer (Redis ElastiCache) ---
module "cache" {
  source             = "./modules/cache"
  project_name       = var.project_name
  region             = var.gcp_region
  network_id         = module.vpc.network_id
}

# --- Compute Layer (App EC2) ---
module "compute" {
  source             = "./modules/compute"
  project_name       = var.project_name
  environment        = var.environment
  region             = var.gcp_region
  private_subnet_id  = module.vpc.private_subnet_id
  instance_count     = var.is_production ? 2 : 1
}
