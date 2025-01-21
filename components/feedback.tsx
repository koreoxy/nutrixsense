"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MessageSquareQuote, Send } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { addFeedback } from "@/actions/feedback";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addFeedbackSchema } from "@/schemas";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";

const Feedback = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addFeedbackSchema>>({
    resolver: zodResolver(addFeedbackSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addFeedbackSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addFeedback(values)
        .then((data: any) => {
          if (data.message === "Feedback berhasil dikirim") {
            setSuccess(data.message);
            form.reset();
          } else {
            setError(
              typeof data.error === "string"
                ? data.error
                : "Terjadi kesalahan saat mengirim feedback."
            );
          }
        })
        .catch((err) => {
          setError("Terjadi kesalahan saat mengirim feedback.");
        });
    });
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <Send className="mr-1" />
         Send Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-1">
            <MessageSquareQuote />
            <h1>Feedback</h1>
          </DialogTitle>
          <DialogDescription>
            Jika Anda memiliki saran, masukan, atau menemukan fitur yang tidak
            berfungsi, silakan kirim pesan Anda di sini. Saran dan kritik Anda
            sangat membantu kami dalam mengembangkan aplikasi NutrixSense lebih
            lanjut. Terima kasih telah mengunjungi aplikasi NutrixSense!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <Textarea
              id="feedback"
              placeholder="Tuliskan feedback anda tentang aplikasi NutrixSense disini!"
              {...form.register("description")}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="mt-5" disabled={isPending}>
            Kirim
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full" variant="outline">
          <Send className="mr-1" /> Kirim Masukan
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="flex items-center gap-1">
            <MessageSquareQuote />
            <h1>Feedback</h1>
          </DrawerTitle>
          <DrawerDescription>
            Jika Anda memiliki saran, masukan, atau menemukan fitur yang tidak
            berfungsi, silakan kirim pesan Anda di sini. Saran dan kritik Anda
            sangat membantu kami dalam mengembangkan aplikasi NutrixSense lebih
            lanjut. Terima kasih telah mengunjungi aplikasi NutrixSense!
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-5">
            <Textarea
              id="feedback"
              placeholder="Tuliskan feedback anda tentang aplikasi NutrixSense disini!"
              {...form.register("description")}
            />
          </div>
          <div className="px-5">
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button
              type="submit"
              className="mt-5 mb-5 w-full"
              disabled={isPending}
            >
              Kirim
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default Feedback;
