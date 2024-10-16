package hu.szarvas.backend.repository;

import hu.szarvas.backend.model.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WarehousesRepository extends JpaRepository<Warehouse, Integer> {
    List<Warehouse> findByNameContainingIgnoreCase(String name);
}
