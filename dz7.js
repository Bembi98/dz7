class Car {
  constructor(
    brand,
    model,
    yearOfManufacturing,
    maxSpeed,
    maxFuelVolume,
    fuelConsumption,
    currentFuelVolume = 0,
    isStarted = false,
    mileage = 0
  ) {
    if (typeof brand !== "string" || brand.length > 50) {
      throw new Error();
    }
    if (typeof model !== "string" || model.length > 50) {
      throw new Error();
    }
    if (
      typeof yearOfManufacturing !== "number" ||
      yearOfManufacturing < 1900 ||
      yearOfManufacturing > new Date().getFullYear()
    ) {
      throw new Error();
    }
    if (typeof maxSpeed !== "number" || maxSpeed < 100 || maxSpeed > 300) {
      throw new Error();
    }
    if (
      typeof maxFuelVolume !== "number" ||
      maxFuelVolume < 5 ||
      maxFuelVolume > 20
    ) {
      throw new Error();
    }
    if (
      typeof fuelConsumption !== "number" ||
      fuelConsumption < 1.2 ||
      fuelConsumption > 3
    ) {
      throw new Error();
    }
    if (
      typeof currentFuelVolume !== "number" ||
      isNaN(currentFuelVolume) ||
      !isFinite(currentFuelVolume)
    ) {
      throw new Error();
    }
    if (typeof isStarted !== "boolean") {
      throw new Error();
    }
    if (typeof mileage !== "number" || isNaN(mileage) || !isFinite(mileage)) {
      throw new Error();
    }

    this.brand = brand;
    this.model = model;
    this.yearOfManufacturing = yearOfManufacturing;
    this.maxSpeed = maxSpeed;
    this.maxFuelVolume = maxFuelVolume;
    this.fuelConsumption = fuelConsumption;
    this.currentFuelVolume = currentFuelVolume;
    this.isStarted = isStarted;
    this.mileage = mileage;
  }

  start() {
    if (this.isStarted) {
      throw new Error("Машина уже заведена");
    }

    this.isStarted = true;
  }

  shutDownEngine() {
    if (!this.isStarted) {
      throw new Error("Машина ещё не заведена");
    }

    this.isStarted = false;
  }

  fillUpGasTank(fuel = 0) {
    if (
      typeof fuel !== "number" ||
      isNaN(fuel) ||
      !isFinite(fuel) ||
      fuel < 0
    ) {
      throw new Error("Неверное количество топлива для заправки");
    }
    if (this.currentFuelVolume + fuel > this.maxFuelVolume) {
      throw new Error("Топливный бак переполнен");
    }

    this.currentFuelVolume += fuel;
  }

  drive(speed, hoursCount) {
    if (
      typeof speed !== "number" ||
      isNaN(speed) ||
      !isFinite(speed) ||
      speed < 0
    ) {
      throw new Error("Неверная скорость");
    }
    if (
      typeof hoursCount !== "number" ||
      isNaN(hoursCount) ||
      !isFinite(hoursCount) ||
      hoursCount < 0
    ) {
      throw new Error("Неверное количество часов");
    }
    if (this.maxSpeed < speed) {
      throw new Error("Машина не может ехать так быстро");
    }
    if (!this.isStarted) {
      throw new Error("Машина должна быть заведена, чтобы ехать");
    }
    const distance = speed * hoursCount;
    if ((this.currentFuelVolume / this.fuelConsumption) * 100 < distance) {
      throw new Error("Недостаточно топлива");
    }

    this.currentFuelVolume -= distance / this.fuelConsumption;
    this.mileage += distance;
  }
}

module.exports = Car;
