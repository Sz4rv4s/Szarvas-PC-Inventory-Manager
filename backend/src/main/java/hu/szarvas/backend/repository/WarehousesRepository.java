package hu.szarvas.backend.repository;

import hu.szarvas.backend.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarehousesRepository extends JpaRepository<Warehouse, Long> {
}
