"use client";

import useRentModal from "@/libs/hooks/useRentModal";
import Modal from "./Modal";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInputs from "../inputs/CategoryInputs";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestRoom: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const WatchCategory = watch("category");
  const WatchLocation = watch("location");

  const Map = useMemo(() => dynamic(() => import('../Map'), {
    ssr: false
  }), [WatchLocation]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };
  const onBack = () => {
    setStep((value) => value - 1);
  };

  const actionLabel = useMemo(() => {
    if (step == STEPS.PRICE) {
      return "create";
    }
    return "next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "back";
  }, [step]);

  let bodyContent = (
    <div className=" flex flex-col gap-8 ">
      <Heading
        title="Which of these best describe your place"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 max-h-[50vh] overflow-y-auto ">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInputs
              onClick={(category) => setCustomValue("category", category)}
              selected={WatchCategory === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={WatchLocation}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map
        center={WatchLocation?.latlng} 
        />
      </div>
    );
  }

  if(step === STEPS.INFO) {
    bodyContent= (
      <div>INFO</div>
      )
  }

  return (
    <Modal
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      title="Airbnb your home"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
