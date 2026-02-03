# test_debug_compose

    This project was generated using `nodejs-quickstart-structure`.

    ## Prerequisites

    - Node.js (v18+)
    - Docker & Docker Compose

    ## Getting Started

    1. **Start Infrastructure** (Database, Kafka, Zookeeper):
            ```bash
            docker-compose up -d
            ```

            2. **Install Dependencies**:
            ```bash
            npm install
            ```

            3. **Run Application**:
            ```bash
            npm run dev
            ```

            ## Project Structure

            The project uses **MVC** with **PostgreSQL**.
                    
                        Microservices communication handled via **Kafka**.
                        

                                ## Demo & Testing

                                ### Health Check

                                ```bash
                                curl http://localhost:3000/health
                                # Output: {"status":"UP"}
                                ```

                                

                                        
                                            ### Kafka
                                            - **Zookeeper**: Port `2181`
                                            - **Kafka Broker**: Port `9092`

                                            You can connect to Kafka using the `kafkajs` library installed in the
                                            project.
                                            

                                                ## Database Migrations

                                                **Flyway** is running in Docker and will automatically apply SQL
                                                migrations from `flyway/sql/` on startup.