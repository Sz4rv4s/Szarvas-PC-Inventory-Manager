package hu.szarvas.backend.service;

import hu.szarvas.backend.dto.PartDTO;
import hu.szarvas.backend.dto.WarehouseDTO;
import hu.szarvas.backend.dto.WarehouseWithPartsDTO;
import hu.szarvas.backend.model.Warehouse;
import hu.szarvas.backend.repository.WarehousesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WarehousesService {
    @Autowired
    private WarehousesRepository warehousesRepository;

    public List<WarehouseDTO> getAllWarehouses() {
        return warehousesRepository.findAll().stream()
                .map(this::convertToWarehouseDTO)
                .collect(Collectors.toList());
    }

    public List<WarehouseWithPartsDTO> getAllWarehousesWithParts() {
        return warehousesRepository.findAll().stream()
                .map(this::convertToWarehouseWithPartsDTO)
                .collect(Collectors.toList());
    }

    public List<WarehouseWithPartsDTO> getPartsByWarehouseName(String name) {
        return warehousesRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::convertToWarehouseWithPartsDTO)
                .collect(Collectors.toList());
    }

    public WarehouseWithPartsDTO getPartsByWarehouseId(Integer id) {
        Warehouse warehouse = warehousesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Warehouse not found"));

        return convertToWarehouseWithPartsDTO(warehouse);
    }

    public WarehouseDTO convertToWarehouseDTO(Warehouse warehouse) {
        return new WarehouseDTO(
                warehouse.getId(),
                warehouse.getName(),
                warehouse.getCity(),
                warehouse.getAddress(),
                warehouse.getCapacity()
        );
    }
    public WarehouseWithPartsDTO convertToWarehouseWithPartsDTO(Warehouse warehouse) {
        List<PartDTO> parts = warehouse.getParts().stream()
                .map(part -> new PartDTO(
                        part.getId(),
                        part.getModel(),
                        part.getBrand(),
                        part.getPrice()
                ))
                .collect(Collectors.toList());

        return new WarehouseWithPartsDTO(
                warehouse.getId(),
                warehouse.getName(),
                warehouse.getCity(),
                warehouse.getAddress(),
                warehouse.getCapacity(),
                parts
        );
    }
}
