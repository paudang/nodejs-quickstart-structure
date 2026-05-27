resource "azurerm_resource_group" "main" {
  name     = "${var.project_name}-rg"
  location = var.azure_location
}

# --- Network Layer ---
module "vpc" {
  source              = "./modules/vpc"
  project_name        = var.project_name
  environment         = var.environment
  is_production       = var.is_production
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

# --- Security Layer (WAF, ALB, SGs) ---
module "security" {
  source              = "./modules/security"
  project_name        = var.project_name
  environment         = var.environment
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  public_subnet_id    = module.vpc.public_subnet_id
  enable_waf          = var.is_production
}

# --- Data Layer (Flexible Server Isolated) ---
module "database" {
  source              = "./modules/database"
  project_name        = var.project_name
  environment         = var.environment
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  private_subnet_id   = module.vpc.private_subnet_id
  db_engine           = var.db_engine
  db_name             = var.db_name
  db_user             = var.db_user
  multi_az            = var.is_production
}

# --- Cache Layer (Azure Cache for Redis) ---
module "cache" {
  source              = "./modules/cache"
  project_name        = var.project_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}

# --- Compute Layer (App VM) ---
module "compute" {
  source              = "./modules/compute"
  project_name        = var.project_name
  environment         = var.environment
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  private_subnet_id   = module.vpc.private_subnet_id
  instance_count      = var.is_production ? 2 : 1
}
