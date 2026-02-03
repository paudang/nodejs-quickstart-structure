# nodejs-service

    This project was generated using `nodejs-quickstart-structure`.

    ## Prerequisites

    - Node.js (v18+)
    - Docker & Docker Compose

    ## Getting Started

    1. **Start Infrastructure** (Database):
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

            The project uses **MVC** with **MySQL**.
                    
                            API is exposed via **REST**.
                            

                                ## Demo & Testing

                                ### Health Check

                                ```bash
                                curl http://localhost:3000/health
                                # Output: {"status":"UP"}
                                ```

                                
                                    ### User API Demo

                                    **Create a User:**
                                    ```bash
                                    curl -X POST http://localhost:3000/api/users \
                                    -H "Content-Type: application/json" \
                                    -d '{"name": "Alice", "email": "alice@example.com"}'
                                    ```

                                    **Get Users:**
                                    ```bash
                                    curl http://localhost:3000/api/users
                                    ```
                                    

                                        

                                                ## Database Migrations

                                                **Flyway** is running in Docker and will automatically apply SQL
                                                migrations from `flyway/sql/` on startup.